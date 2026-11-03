export interface SensorDriver<T> {
    start(onReading: (reading: T) => void): void;
    stop(): void;
}

export interface GpsReading {
    latitude: number;
    longitude: number;
    accuracy?: number;
    heading?: number;
    speed?: number;
}

export interface RfidReading {
    epc: string;
    rssi: number;
}

export interface Vector3 {
    x: number;
    y: number;
    z: number;
}

export interface ImuReading {
    /** Acceleration in g */
    accel: Vector3;
    /** Rotation in degrees per second */
    gyro: Vector3;
}
