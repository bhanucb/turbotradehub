import { IJsonModel } from "flexlayout-react";

const model: IJsonModel = {
  global: {},
  layout: {
    type: "row",
    children: [
      {
        type: "row",
        children: [
          {
            type: "row",
            weight: 30,
            children: [
              {
                type: "tabset",
                enableMaximize: true,
                children: [
                  {
                    id: "summaryBox",
                    type: "tab",
                    name: "Summary",
                    component: "summaryBox",
                    enableClose: false,
                  },
                ],
              },
              {
                type: "tabset",
                enableMaximize: true,
                children: [
                  {
                    id: "watchBox",
                    type: "tab",
                    name: "Watch",
                    component: "watchBox",
                    enableClose: false,
                  },
                ],
              },
            ],
          },
          {
            id: "parent-tabset",
            type: "tabset",
            children: [
              {
                id: "tab-manager-tab",
                type: "tab",
                name: "New Tab",
                component: "tabManager",
              },
            ],
          },
        ],
      },
    ],
  },
};

export default model;
