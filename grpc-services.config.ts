import {
  ClientGrpcProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { join } from 'path';

const loader = {
  arrays: true,
  objects: true,
  json: true,
};

export function getVolunteerPackage(url: string): ClientGrpcProxy {
  return ClientProxyFactory.create({
    transport: Transport.GRPC,
    options: {
      package: 'VolunteerServicePackage',
      protoPath: join(
        process.cwd(),
        './node_modules/@i-want-to-help-ukraine/protobuf/schema/volunteer-service.proto',
      ),
      url,
      loader,
    },
  });
}
