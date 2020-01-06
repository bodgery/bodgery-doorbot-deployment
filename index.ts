import * as Doorbot from '@frezik/doorbot-ts';
import * as RPi from '@frezik/rpi-doorbot-ts';
import * as Bodgery from '@bodgery/bodgery-doorbot-ts';


const PIN = 22;
const OPEN_TIME_MS = 30000;
const BODGERY_API_HOST = "app.tyrion.thebodgery.org";
const BODGERY_API_PORT = 443;

Doorbot.init_logger( "/home/pi/doorbot/doorbot.log"  )


const reader = new RPi.WiegandReader( 17, 18 );
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
