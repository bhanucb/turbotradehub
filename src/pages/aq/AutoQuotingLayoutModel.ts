import { IJsonModel } from "flexlayout-react";

const model: IJsonModel = {
  global: { tabSetEnableTabStrip: false },
  layout: {
    type: "row",
    children: [
      {
        type: "row",
        children: [
          {
            type: "row",
            weight: 40,
            children: [
              {
                type: "tabset",
                enableMaximize: true,
                children: [
                  {
                    id: "discountGrid",
                    type: "tab",
                    name: "Discounts",
                    component: "discountGrid",
                  },
                ],
              },
              {
                type: "tabset",
                enableMaximize: true,
                children: [
                  {
                    id: "tierGrid",
                    type: "tab",
                    name: "Tier",
                    component: "tierGrid",
                  },
                ],
              },
            ],
          },
          {
            type: "row",
            children: [
              {
                type: "tabset",
                enableMaximize: true,
                children: [
                  {
                    id: "clientGrid",
                    type: "tab",
                    name: "Clients",
                    component: "clientGrid",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

export default model;
