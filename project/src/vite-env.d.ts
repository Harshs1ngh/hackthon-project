/// <reference types="vite/client" />

// src/globals.d.ts
declare module "three/examples/jsm/controls/OrbitControls" {
  import { Camera, MOUSE, EventDispatcher, Vector3, HTMLElement } from "three";
  export class OrbitControls extends EventDispatcher {
    constructor(object: Camera, domElement?: HTMLElement);
    enabled: boolean;
    target: Vector3;
    update(): void;
    enableDamping: boolean;
    dampingFactor: number;
    minDistance: number;
    maxDistance: number;
    minPolarAngle: number;
    maxPolarAngle: number;
    mouseButtons: { LEFT: MOUSE; MIDDLE: MOUSE; RIGHT: MOUSE };
    dispose(): void;
  }
}

declare module "three/examples/jsm/loaders/GLTFLoader" {
  import { LoadingManager, EventDispatcher } from "three";
  import { Group } from "three/src/objects/Group";
  export class GLTFLoader extends EventDispatcher {
    constructor(manager?: LoadingManager);
    load(
      url: string,
      onLoad: (gltf: { scene: Group }) => void,
      onProgress?: (event: ProgressEvent<EventTarget>) => void,
      onError?: (event: ErrorEvent) => void
    ): void;
  }
}
