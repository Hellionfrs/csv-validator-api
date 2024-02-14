import { ZodError } from "zod";

type ErrorOutput = {
  [key: string]: string;
};

export function formatErrors(error: ZodError): ErrorOutput {
  const errorDetails: ErrorOutput = {};

  for (let issue of error.errors) {
    const path = issue.path.join(".");
    errorDetails[path] = issue.message;
  }

  return errorDetails;
}
