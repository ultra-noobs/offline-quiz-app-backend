require('dotenv').config()
// this file demonstrate the base of twilio api for sending sms
var accountSid = 'ACe86e83fe42de7f63229635268c58d3b7'; // Your Account SID from www.twilio.com/console
var authToken = '7a2ffe2b6be1d0692a285c757024022f';   // Your Auth Token from www.twilio.com/console

const client = require('twilio')(accountSid, authToken, {
    lazyLoading: true
});

const sendSMS = () => {
    client.messages.create({
        body:"Astronomy (from Greek: ἀστρονομία, literally meaning the science that studies the laws of the stars) is a natural science that studies celestial objects and phenomena. It uses mathematics, physics, and chemistry in order to explain their origin and evolution. Objects of interest include planets, moons, stars, nebulae, galaxies, and comets. Relevant phenomena include supernova explosions, gamma ray bursts, quasars, blazars, pulsars, and cosmic microwave background radiation. More generally, astronomy studies everything that originates outside Earths atmosphere. Cosmology is a branch of astronomy that studies the universe Astronomy is one of the oldest natural sciences. The early civilizations in recorded history made methodical observations of the night sky. These include the Babylonians, Greeks, Indians, Egyptians, Chinese, Maya, and many ancient indigenous peoples of the Americas. In the past, astronomy included disciplines as diverse as astrometry, celestial navigation, observational astronomy, and the making of calendars. Nowadays, professional astronomy is often said to be the same Professional astronomy is split into observational and theoretical branches. Observational astronomy is focused on acquiring data from observations of astronomical objects. This data is then analyzed using basic principles of physics. Theoretical astronomy is oriented toward the development of computer or analytical models to describe astronomical objects and phenomena. These two fields complement each other. ",
        to: "+918871719893",
        from:"+17816616049"
    }).then((message) => {
        console.log(message);
    }). catch((err) => {
        console.log(err);
    })
}

sendSMS();



