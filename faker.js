import { createClient } from '@supabase/supabase-js';
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
import crypto from 'crypto';

// Load environment variables from the .env file
dotenv.config();

// Retrieve Supabase URL and Key from environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase URL and Key are required');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);


// Function to generate random data for gamification
const generateDummyGamificationData = (numRecords) => {
    const dummyData = [];

    for (let i = 0; i < numRecords; i++) {
        dummyData.push({
            user_id: faker.number.int({ min: 100, max: 1000000 }), // Use crypto to generate a unique user_id
            points: faker.number.int({ min: 100, max: 1000 }), // Random points
            level: faker.number.int({ min: 1, max: 10 }), // Random level
            badges: faker.helpers.shuffle(["Beginner", "Explorer", "Achiever", "Master", "Veteran"]), // Random badges as an array
            last_activity: faker.date.recent(),
            created_at: faker.date.past(),
            updated_at: faker.date.recent(),
        });
    }

    return dummyData;
};

// Function to insert data in bulk
const insertGamificationData = async (numRecords) => {
    const data = generateDummyGamificationData(numRecords);

    const { data: insertedData, error } = await supabase
        .from('gamification')
        .insert(data);

    if (error) {
        console.error('Error inserting data:', error);
    } else {
        console.log(`Successfully inserted ${insertedData.length} records.`);
    }
};

// Insert 1000 dummy records
await insertGamificationData(1000);
