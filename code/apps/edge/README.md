# EDGE

The `apps/edge` directory is for all the code that will be running on the edge devices, Raspberry Pi's in our case.

## Runtime

The typescript code will be compiled to JavaScript, built into a Docker image running NodeJS 24 LTS (Long-Term-Support), and will be published to a Github Container registry. The Raspberry Pi's will then fetch the latest image from said registry to update the services running on it.

A potential solution that we might explore would be to split the edge device "app" into multiple services, represented by docker images. That way, we could have one service responsible for synchronizing the data with the backend, one that was responsible for capturing the data from the peripheral devices (GPS, Accelerometer, RFID Antenna and such). This would also allow us to create a "mock" variant of the last service, giving us a web interface or some other way of manually triggering different events.

## Development

In development on our local machines, we will still be using docker, to simulate the same exact runtime that the Raspberry Pi's will be operating in. The one limitation that we have is that we aren't able to connect the GPS modules, accelerometers, and other serial devices directly to our laptops. So we need to find a solution to mock or fake those for testing purposes.
