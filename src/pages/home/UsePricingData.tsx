import { useEffect, useRef, useState } from "react";
import { RxStomp } from "@stomp/rx-stomp";
import { EMPTY, map, startWith, Subscription, switchMap, tap } from "rxjs";
import { RawMessage } from "../../models/RawMessage";

const brokerUrl =
  "ws://CB1489402.mpceast.cloud1.cibc.com:8486/ipa-calc-engine/ipa";
const priceAndPositionTopic = "/topic/merge";
const snapshotQueue = "/queue/reply-defaultuser";

export type StreamData = {
  add: Array<RawMessage>;
  update: Array<RawMessage>;
  full: Array<RawMessage>;
};

export function usePricingData() {
  const [stompClient, setStompClient] = useState<RxStomp>();
  const latestSnapshot = useRef<{ [key in string]: RawMessage }>({});

  function getPricingData(
    isSandboxModeOn: boolean,
    onSnapshotLoad: (snapshot: Array<RawMessage>) => void,
    onLiveUpdateLoad: (streamData: StreamData) => void,
    predicate?: (
      value: RawMessage,
      index: number,
      array: RawMessage[]
    ) => unknown
  ) {
    if (stompClient === undefined) return null;

    let subscription: Subscription;

    stompClient.publish({
      destination: "/app/request",
      body: "snapshot",
    });

    const snapshotStream = stompClient.watch(snapshotQueue).pipe(
      map(({ body }) => JSON.parse(body) as Array<RawMessage>),
      map((results) => (!!predicate ? results.filter(predicate) : results)),
      tap((data) => {
        const rawMessageDictionary: { [key in string]: RawMessage } = {};
        for (let msg of data) {
          rawMessageDictionary[msg.bbgId59] = msg;
        }
        latestSnapshot.current = rawMessageDictionary;
      })
    );

    const liveStream = stompClient.watch(priceAndPositionTopic).pipe(
      startWith({ body: "{}" }),
      map(({ body }) => JSON.parse(body) as RawMessage),
      map((row) => {
        const add: Array<RawMessage> = [];
        const update: Array<RawMessage> = [];
        if (!!latestSnapshot.current[row.bbgId59]) {
          update.push(row);
        } else {
          add.push(row);
        }

        latestSnapshot.current[row.bbgId59] = row;

        return {
          add,
          update,
          full: Object.values(latestSnapshot.current),
        } as StreamData;
      }),
      map((results) =>
        !!predicate
          ? {
              add: results.add.filter(predicate),
              update: results.update.filter(predicate),
              full: results.full.filter(predicate),
            }
          : results
      )
    );

    subscription = snapshotStream
      .pipe(
        switchMap((snapshot) => {
          onSnapshotLoad(snapshot);
          if (isSandboxModeOn) {
            return EMPTY;
          }

          return liveStream;
        })
      )
      .subscribe((streamData) => {
        onLiveUpdateLoad(streamData);
      });

    return subscription;
  }

  useEffect(() => {
    const client = new RxStomp();
    client.configure({ brokerURL: brokerUrl });

    if (!client.connected()) client.activate();
    client.webSocketErrors$.subscribe((e: Event) => {
      if (e.type === "error") {
        client.deactivate().then(); // todo: retry logic
      }
    });

    client.connected$.subscribe((value) => {
      if (value === 1) {
        setStompClient(client);
      } else {
        setStompClient(undefined);
      }
    });

    return () => {
      if (client.connected()) client.deactivate().then();
    };
  }, []);

  return {
    getPricingData,
  };
}
