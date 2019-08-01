const SENDGRID_API_KEY = "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";
const EMAIL_FROM = "daniel72584@gmail.com";
const { google } = require('googleapis');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

// Enter your calendar ID and service account JSON below.
const calendarId = '18k527bnt13j6vd0m3m6c7gjcs@group.calendar.google.com'; // Example: 6ujc6j6rgfk02cp02vg6h38cs0@group.calendar.google.com
const serviceAccount = {
  "type": "service_account",
  "project_id": "monitora-35167",
  "private_key_id": "410f8aca0e7d3a692620738a120acd2df4c08327",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCiPNVcjMEowlQk\nit19jeZQggShnOD/c5J0JHiDs3d5JmaYl5FGnEOyr9u9IkYOfzFSUZ5YAAiTiw3g\n8voS53hK3ibbnJOE9nBPt6/E3BkXIc1vpHwPVhdVtMGO+Uhhb5bN/BE+v5TXTa46\nbh8+zEvxYGCDDT8v+bdlEiuir/7stzKgGk8JVtAWFvYAuBKcABMlbBkPZtkqel/d\nxxBcySodxuNRpCU0IpJldBWIuut9SX84SLHGRQPBLUF1CkD8PrGS/PmZtb52RoJ1\nYw5R5hX6t4WPch+KCg4jvvP6PUgi7Ls/4NbEiSCVxktdRHO3WqTTZoBgc5rylexa\nfMfUWp19AgMBAAECggEAA+dCEzB4DGc20J6MH9NrQDufcnloAdsdNCe56I+Q5zyD\nNvsTtu/7sCIdv66v64c6Ug81FXCCMge2hUU6KKD+EW1aKY6jfR+KxYFghZjtxVM0\n8lqfsBJ81WGzT1hh7IESc5FGETrrfsSgnrbXa3couE/HzhiG/uDbj80JwnDtbinS\n8maPrzPo4Ku1SP4j1MlXxqJOQ6qE2qsS7AJ6A2s/FzPVSF+sozvjcyBCHBUZhXzq\na4G2AKHrjqyjiTkHxwOK/yAiZSFJMvIy1Z/Hm1J2k+U/Z46i+W9UJFjrah4WYtmz\nAZh5vCoEkfrj3P0UHtMgo/P1y8+gg8mtNovU59Y9cQKBgQDbzBVI5VDSz0tiP2j2\n/XL3Yk3W+UgvthGIk5SwmlYjFqQc0sjCalZ5uNwc4vUQ6Zc4ZpvKTjsEzHLcbuNX\nk/9KVv+Zf33MUxW/WN9dcmS4obCOJq0iAo5pWjj2GnakrL9k+NEmE5sXL62zK+CC\n2bStaGBi80oIh2l2Jvgry3sjhQKBgQC89bUD5/K5vysAx3G9zSRm8rutrL1iarzk\nSbP3AsII/APoMnbLDAuyyDfjWMs9tzFhmN1Oz3roGEl0KDxjmIf/alUmAXnvtfoA\ntS4CxsrwiNKplG+8qBQwAHKVHStSVCZVJrWHdwVGBAormMMq/kPFKuOBHXhI4qjW\nazLfDG7HmQKBgH3PhotwP2A7qbG2DBX8ozb5PQcFL42n0Md1elHQNeflyNB60tF9\n3rvT1aJvQsmIe7eb/CbDusKXaFPG4Ti7DRD3VVz+ffpbwIIDk+9AUGjinFXxy35B\nKlUhgKNWKH1AKFnalpUN+eM+tlVtkxgzF1l++lUJX2IcaIBp8/nVgkmlAoGAaX+N\nVubzX71Z1w+Dc4LLZibznd2pxv7tA1AbCDgj+TwrOkKijG7nQSQEAAydPJHBIkpk\nlRHF/ztAF3g3byvEElhdveBpIeqp8Cc3zxkKSQ07AK79S4lT7BDz6Ejm3QpadIQu\nKbnL2fF7dCfQH3rif3yYlIfNlnPl7ADh4CJi31ECgYEAq2Umbxeh4GiVYknH2NfM\n6KJ8TvQTnEiSWV+rhO7XgNSIYlpCwJq0NwBgLime/4OfEl+wbO5Nsdh9u3XaMT5a\nVmT0KcrC7XCvs9RYsfRtkAo231ygo7BT7RcpwJ4eFP+wvY7STg7z8uyz0K2mkI9Z\nqWfhzIJZHJT8MROTpqh3iE0=\n-----END PRIVATE KEY-----\n",
  "client_email": "calendar@monitora-35167.iam.gserviceaccount.com",
  "client_id": "107428153356176205004",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/calendar%40monitora-35167.iam.gserviceaccount.com"
}; // The JSON object looks like: { "type": "service_account", ... }

// Set up Google Calendar service account credentials
const serviceAccountAuth = new google.auth.JWT({
  email: serviceAccount.client_email,
  key: serviceAccount.private_key,
  scopes: 'https://www.googleapis.com/auth/calendar'
});

const calendar = google.calendar('v3');
process.env.DEBUG = 'dialogflow:*'; // It enables lib debugging statements

const timeZone = 'America/Los_Angeles';  // Change it to your time zone
const timeZoneOffset = '-07:00';         // Change it to your time zone offset

function sendMail(data1, data2) {
  return sgMail.send({
    to: ["daniel72584@gmail.com"],
    from: "daniel72584@gmail.com",
    subject: `Got it. I have your appointment scheduled on ${data2} at ${data2}. See you soon. Good-bye.`,
    html: `<stronge>Got it. I have your appointment scheduled on ${data1} at ${data2}. See you soon. Good-bye.</stronge>`
  });
}

function makeAppointment(dateTimeStart, dateTimeEnd) {
  dateTimeStart = new Date(dateTimeStart);
  dateTimeEnd = new Date(dateTimeEnd);

  // Use the Dialogflow's date and time parameters to create Javascript Date instances, 'dateTimeStart' and 'dateTimeEnd',
  // which are used to specify the appointment's time.
  const appointmentDuration = 1;// Define the length of the appointment to be one hour.
  //const dateTimeStart = convertParametersDate(agent.parameters.date, agent.parameters.time);
  //const dateTimeEnd = addHours(dateTimeStart, appointmentDuration);
  //const appointmentTimeString = getLocaleTimeString(dateTimeStart);
  //const appointmentDateString = getLocaleDateString(dateTimeStart);
  //sendMail({appointmentDateString:appointmentDateString,appointmentTimeString:appointmentTimeString});
  return createCalendarEvent(dateTimeStart, dateTimeEnd).then(() => {
    console.log(`Got it. I have your appointment scheduled on ${appointmentDateString} at ${appointmentTimeString}. See you soon. Good-bye.`);
  }).catch((error) => {
    console.log('error', error)
    console.log(`Sorry, we're booked o ${error} ${dateTimeStart} at ${dateTimeEnd}. Is there anything else I can do for you?`);
  });



}
function createCalendarEvent(dateTimeStart, dateTimeEnd) {
  return new Promise((resolve, reject) => {
    console.log('inicia', dateTimeStart.toISOString(), dateTimeEnd.toISOString())
    calendar.events.list({  // List all events in the specified time period
      auth: serviceAccountAuth,
      calendarId: calendarId,
      timeMin: dateTimeStart.toISOString(),
      timeMax: dateTimeEnd.toISOString()
    }, (err, calendarResponse) => {
      console.log('error', err, calendarResponse);

      // Check if there exists any event on the calendar given the specified the time period
      if (err || calendarResponse.data.items.length > 0) {
        reject(err || new Error('Requested time conflicts with another appointment'));
      } else {
        // Create an event for the requested time period
        calendar.events.insert({
          auth: serviceAccountAuth,
          calendarId: calendarId,
          resource: {
            summary: 'Store',
            start: { dateTime: dateTimeStart },
            end: { dateTime: dateTimeEnd }
          }
        }, (err, event) => {
          err ? reject(err) : resolve(event);
        }
        );
      }
    });
  });
}

// A helper function that receives Dialogflow's 'date' and 'time' parameters and creates a Date instance.
function convertParametersDate(date, time) {
  return new Date(Date.parse(date.split('T')[0] + 'T' + time.split('T')[1].split('-')[0] + timeZoneOffset));
}

// A helper function that adds the integer value of 'hoursToAdd' to the Date instance 'dateObj' and returns a new Data instance.
function addHours(dateObj, hoursToAdd) {
  return new Date(new Date(dateObj).setHours(dateObj.getHours() + hoursToAdd));
}

// A helper function that converts the Date instance 'dateObj' into a string that represents this time in English.
function getLocaleTimeString(dateObj) {
  return dateObj.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, timeZone: timeZone });
}

// A helper function that converts the Date instance 'dateObj' into a string that represents this date in English.
function getLocaleDateString(dateObj) {
  return dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', timeZone: timeZone });
}
sendMail('at Aug 03 2019 22:00:00 GMT+0000 (UTC)', 'at Aug 03 2019 24:00:00 GMT+0000 (UTC)')