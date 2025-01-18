const cron = require('node-cron');
const transporter = require('../config/nodeMailer');
const Events = require('../models/eventModel')
const Users = require('../models/userModel');






async function sendEmail(eventId){
       console.log('Sending email', eventId);

     const event = await Events.findById(eventId).populate('attendes');

     const eventCreater = await Users.findById(event.createdBy)

    console.log(eventCreater,'eventCreater');


    
    
     console.log(event,"event");
    await Promise.all(event.attendes.map(async (attendee) => {
         console.log(attendee,"attendee in map");
        

         const mailOptions = {
            from: eventCreater.email, // Email of the event creator
            to: attendee.email, // Email of the attendee
            subject: `🎉 You’re Invited to ${event.title}!`, // Use the event name dynamically
            html: `
                <!DOCTYPE html> 
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>You're Invited!</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f9f9f9;
                            margin: 0;
                            padding: 0;
                            color: #333333;
                        }
                        .container {
                            max-width: 600px;
                            margin: 20px auto;
                            background-color: #ffffff;
                            border-radius: 8px;
                            overflow: hidden;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        }
                        .header {
                            background-color: #4CAF50;
                            color: white;
                            text-align: center;
                            padding: 20px;
                        }
                        .header h1 {
                            margin: 0;
                            font-size: 24px;
                        }
                        .content {
                            padding: 20px;
                        }
                        .content h2 {
                            color: #4CAF50;
                            font-size: 20px;
                            margin-top: 0;
                        }
                        .content p {
                            font-size: 16px;
                            line-height: 1.6;
                        }
                        .event-details {
                            background-color: #f1f1f1;
                            padding: 15px;
                            margin: 20px 0;
                            border-left: 4px solid #4CAF50;
                        }
                        .event-details p {
                            margin: 5px 0;
                            font-weight: bold;
                        }
                        .footer {
                            background-color: #f1f1f1;
                            text-align: center;
                            padding: 15px;
                            font-size: 14px;
                            color: #777777;
                        }
                        .button {
                            display: inline-block;
                            padding: 10px 20px;
                            color: white;
                            background-color: #4CAF50;
                            text-decoration: none;
                            border-radius: 5px;
                            margin-top: 10px;
                        }
                        .button:hover {
                            background-color: #45a049;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <!-- Header Section -->
                        <div class="header">
                            <h1>You're Invited!</h1>
                        </div>
        
                        <!-- Content Section -->
                        <div class="content">
                            <h2>Hello, ${attendee.name}!</h2>
                            <p>We are thrilled to invite you to our special event. It’s going to be an amazing gathering filled with fun, learning, and great experiences.</p>
                            <div class="event-details">
                                <p>🎉 <strong>Event Name:</strong> ${event.title}</p>
                                <p>📍 <strong>Location:</strong> ${event.location}</p>
                                <p>📅 <strong>Date:</strong> ${event.eventDate}</p>
                                <p>⏰ <strong>Time:</strong> 2pm - 5pm  </p>
                            </div>
                            <p>Please confirm your attendance by replying to this email or clicking the button below:</p>
                            <a href="mailto:${eventCreater.email}?subject=RSVP for ${event.title}" class="button">RSVP Now</a>

                        </div>
        
                        <!-- Footer Section -->
                        <div class="footer">
                            <p>If you have any questions, feel free to reach out to us at ${eventCreater.email}.</p>
                            <p>Looking forward to seeing you there!</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        };
        
        await transporter.sendMail(mailOptions);
    }));
}



const sheduleEmailReminder =()=>{


    cron.schedule('0 9 * * *', async () => {
        console.log('Sending email');
        const today = new Date();
        console.log('Sending', today );

        try {
            const events = await Events.find();
            console.log(events,"events");
            await Promise.all(events.map(async (event) => {
                const eventDate = new Date(event.eventDate);
                console.log(eventDate,"eventDate")
                const daysUntilEvent = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
                 console.log('Days until event', daysUntilEvent);
                if(daysUntilEvent === 2) {
                    console.log('Sending email for', event._id);
                    sendEmail(event._id) 
                }

            }));
        } catch (error) {
            console.log(error);
        }
    });
    



}


module.exports = {
    sheduleEmailReminder,
    sendEmail

};