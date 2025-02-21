import React from "react";
import { SingleForm } from "../src";
import { z } from "zod";
const jsonConfig = [
  {
    name: "name",
    type: "string",
    validation: z.string().min(1),
  },
  {
    name: "date",
    type: "date",
    validation: z.string().min(1),
  },
];

const fakeApiCall = (values: Record<string, any>) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Submitted values:", values);
      resolve({ status: 200, data: values });
    }, 1000);
  });
};

const handleSubmit = async (values: Record<string, any>) => {
  try {
    const response = await fakeApiCall(values);
    console.log("API Response:", response);
  } catch (error) {
    console.error("API Error:", error);
  }
};

function SingleFormItem() {
  return <SingleForm config={jsonConfig} onSubmit={handleSubmit} />;
}

export default SingleFormItem;
