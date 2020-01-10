import * as Process from 'child_process';

const WIEGAND_PROGRAM = '/home/pi/wiegand_pigpio/wiegand_c';
const WIEGAND0_PIN = 17;
const WIEGAND1_PIN = 18;

const wiegand = Process.spawn( WIEGAND_PROGRAM, [
    WIEGAND0_PIN.toString()
    ,WIEGAND1_PIN.toString()
]);
wiegand.on( 'error', (err) => {
    console.log( '<Main> Error starting Wiegand reader: ' + err );
    process.exit(1);
});
wiegand.on( 'close', (code, sig) => {
    console.log( '<Main> Wiegand reader has closed, code ' + code
        + ', signal ' + sig );
    process.exit(0);
});
wiegand.on( 'exit', (code, sig) => {
    console.log( '<Main> Wiegand reader has exited, code ' + code
        + ', signal ' + sig );
    process.exit(0);
});
wiegand.stdout.on( 'data', (data) => {
    console.log( '<Main> Got Wiegand read: ' + data );
});
wiegand.stderr.on( 'data', (data) => {
    console.log( '<Main> Got stderr data from wiegand: ' + data );
});

console.log( '<Main> Ready to read' );
