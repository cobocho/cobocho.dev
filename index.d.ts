type UnpackArray<T> = T extends (infer U)[] ? U : T;
