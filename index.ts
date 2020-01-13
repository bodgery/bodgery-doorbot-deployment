import * as Doorbot from '@frezik/doorbot-ts';
import * as RPi from '@frezik/rpi-doorbot-ts';
import * as Bodgery from '@bodgery/bodgery-doorbot-ts';
import * as Process from 'child_process';


const PIN = 22;
const OPEN_TIME_MS = 30 * 1000;
const BODGERY_API_HOST = "app.tyrion.thebodgery.org";
const BODGERY_API_PORT = 443;
const WIEGAND_PROGRAM = '/usr/local/sbin/wiegand_c';
const WIEGAND0_PIN = 12;
const WIEGAND1_PIN = 13;

Doorbot.init_logger( "/home/pi/doorbot/doorbot.log"  )


// Launch wiegand reader program as its own process. Run its STDOUT into 
// an fs reader.

const wiegand = Process.spawn( WIEGAND_PROGRAM, [
    WIEGAND0_PIN.toString()
    ,WIEGAND1_PIN.toString()
]);
wiegand.on( 'error', (err) => {
    Doorbot.log.error( '<Main> Error starting Wiegand reader: ' + err );
    process.exit(1);
});
/*
 * Test code
wiegand.stdout.on( 'data', (data) => {
    Doorbot.log.info( '<Main> Got Wiegand read: ' + data );
});
 */

const reader = new Doorbot.FHReader( wiegand.stdout );
const auth = new Bodgery.BodgeryOldAPIAuthenticator(
    BODGERY_API_HOST
    ,BODGERY_API_PORT
    ,"https"
);
const act = new RPi.GPIOActivator( PIN, OPEN_TIME_MS );

reader.init();
act.init();

reader.setAuthenticator( auth );
auth.setActivator( act );

reader
    .run()
    .then( (res) => {} );
