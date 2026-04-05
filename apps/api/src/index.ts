import "dotenv/config";
import serverless from "serverless-http";
import app from "./app.js";

const serverlessHandler = serverless(app);

type LambdaEventLike = {
  httpMethod?: string;
  path?: string;
  rawPath?: string;
  requestContext?: {
    requestId?: string;
    httpMethod?: string;
    path?: string;
    http?: {
      method?: string;
      path?: string;
    };
  };
};

type LambdaContextLike = {
  awsRequestId?: string;
  callbackWaitsForEmptyEventLoop?: boolean;
};

function getStatusCode(response: unknown): number | null {
  if (
    typeof response === "object" &&
    response !== null &&
    "statusCode" in response &&
    typeof response.statusCode === "number"
  ) {
    return response.statusCode;
  }

  return null;
}

// AWS Lambda mode
export const handler = async (
  event: LambdaEventLike,
  context: LambdaContextLike,
) => {
  // Prisma/Postgres keeps sockets open between invocations. In Lambda we want to
  // reuse those connections without blocking the current response.
  context.callbackWaitsForEmptyEventLoop = false;

  const requestContext = event?.requestContext;

  console.log("Lambda request received", {
    awsRequestId: context?.awsRequestId ?? null,
    requestId: requestContext?.requestId ?? null,
    method:
      requestContext?.http?.method ??
      requestContext?.httpMethod ??
      event?.httpMethod ??
      null,
    path:
      requestContext?.http?.path ??
      requestContext?.path ??
      event?.rawPath ??
      event?.path ??
      null,
  });

  try {
    const response = await serverlessHandler(event, context);
    const statusCode = getStatusCode(response);

    if (statusCode !== null && statusCode >= 500) {
      console.error("Lambda handler returned 5xx response", {
        awsRequestId: context?.awsRequestId ?? null,
        statusCode,
        path:
          requestContext?.http?.path ??
          requestContext?.path ??
          event?.rawPath ??
          event?.path ??
          null,
      });
    }

    return response;
  } catch (error) {
    console.error("Unhandled Lambda error", {
      awsRequestId: context?.awsRequestId ?? null,
      requestId: requestContext?.requestId ?? null,
      error,
    });
    throw error;
  }
};
