import { UntypedServiceImplementation } from "@grpc/grpc-js";

 function InterceptedService(prototype: UntypedServiceImplementation, middleware: Function) {
    const interceptedService: UntypedServiceImplementation = Object.getOwnPropertyNames(prototype).reduce(
      (acc: any, methodName) => {
          if (typeof prototype[methodName] === 'function' && !methodName.startsWith('_')) {
            const methodFn = prototype[methodName];
          acc[methodName] = (call: any, callback: any) => {
              // @ts-ignore
              middleware(call, callback, () => methodFn.call(acc, call, callback));
            }
        } else {
          acc[methodName]  = prototype[methodName];
        }
        return acc;
      },
      {}
    );

    return interceptedService;
}

export default InterceptedService;