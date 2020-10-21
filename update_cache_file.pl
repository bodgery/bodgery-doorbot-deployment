#!perl
use v5.20;
use strict;
use warnings;
use Sereal::Decoder;
use LWP::UserAgent;
use Cpanel::JSON::XS 'encode_json';
use MIME::Base64 'encode_base64';

use constant BODGERY_API_HOST => "app.tyrion.thebodgery.org";
use constant BODGERY_API_PATH => '/secure/dump_active_tags';
use constant BODGERY_API_USERNAME => 'hodor';
use constant BODGERY_API_PASSWORD => '8608ZAMBc@74RT$dFbPeiVofObHxv*4C1gFdqW@^';
use constant DOWNLOAD_PATH => '/var/tmp-ramdisk/cache.json';

package UA;
use base 'LWP::UserAgent';

sub get_basic_credentials
{
    my ($realm, $uri, $isproxy) = @_;
    return (
        main::BODGERY_API_USERNAME
        ,main::BODGERY_API_PASSWORD
    );
}


package main;


my $lwp = UA->new();
my $response = $lwp->get( 'https://'
    . BODGERY_API_HOST
    . BODGERY_API_PATH
);

if( 200 == $response->code ) {
    my $sereal = Sereal::Decoder->new({
    });
    my $output = $sereal->decode( $response->content );
    my $json = encode_json( $output );

    open( my $fh, '>', DOWNLOAD_PATH )
        or die "Can't open " . DOWNLOAD_PATH . " for writing: $!\n";
    print $fh $json;
    close $fh;
}
else {
    warn "Could not fetch Sereal cache file: " . $response->message;
}
