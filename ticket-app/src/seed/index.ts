import 'dotenv/config'

import db from '@/database/drizzle';
import { events, seats } from '@/models';
import { faker } from '@faker-js/faker';
import { Logger } from '@/utils';


const createRandomEvent = () => ({
    title: faker.lorem.words(3),
});

const seeds = async () => {
    const randomEvents = Array.from({ length: 1000 }, createRandomEvent);
    randomEvents.forEach(async (event) => {
        Logger.info(`Creating event: ${JSON.stringify(event)}`)
        const newEvent = await db.insert(events).values(event).returning({
            id: events.id,
            title: events.title,
        });
        

        const eventId = newEvent[0].id;
        Array.from({ length: 100 }).forEach(async (_, index) => {
            Logger.info(`Creating seat: ${index + 1} for event: ${eventId}`)
            await db.insert(seats).values({
                event_id: eventId,
                number: index + 1,
                status: "open"
            })
        })
    })
}

seeds()