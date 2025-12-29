#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import { faker } from '@faker-js/faker';
import { config } from 'dotenv';
config();

// Retrieve Supabase URL and Key from environment variables
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase URL and Key are required');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Generate random data for users
const generateDummyUsers = (numRecords) => {
    const dummyUsers = [];
    for (let i = 0; i < numRecords; i++) {
        dummyUsers.push({
            id: crypto.randomUUID(),
            username: faker.internet.username(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            created_at: faker.date.past(),
            updated_at: faker.date.recent()
        });
    }
    return dummyUsers;
};

// Generate random data for gamification
const generateDummyGamificationData = (numRecords) => {
    const dummyData = [];
    for (let i = 0; i < numRecords; i++) {
        dummyData.push({
            id: crypto.randomUUID(),
            game_name: faker.company.buzzNoun(),
            points: faker.number.int({ min: 100, max: 1000 }),
            level: faker.number.int({ min: 1, max: 10 }),
            badges: faker.helpers.arrayElement(['Beginner', 'Explorer', 'Achiever', 'Master', 'Veteran']),
            last_activity: faker.date.recent(),
            created_at: faker.date.past(),
            updated_at: faker.date.recent()
        });
    }
    return dummyData;
};

// Generate random data for user_gamification relationships
const generateDummyUserGamification = (userIds, gameIds, numRecords) => {
    const dummyData = [];
    for (let i = 0; i < numRecords; i++) {
        dummyData.push({
            id: crypto.randomUUID(),
            user_id: faker.helpers.arrayElement(userIds),
            game_id: faker.helpers.arrayElement(gameIds),
            assigned_at: faker.date.recent()
        });
    }
    return dummyData;
};

// Insert data into the users table
const insertUsers = async (numRecords) => {
    const dummyUsers = generateDummyUsers(numRecords);

    const { error } = await supabase
        .from('users')
        .insert(dummyUsers);

    if (error) {
        console.error('Error inserting users:', error);
        return [];
    } else {
        console.log(`Successfully inserted ${dummyUsers.length} users.`);
        return dummyUsers.map(user => user.id);
    }
};

// Insert data into the gamification table
const insertGamificationData = async (numRecords) => {
    const insertedGames = generateDummyGamificationData(numRecords);

    const { error } = await supabase
        .from('gamification')
        .insert(insertedGames);

    if (error) {
        console.error('Error inserting gamification data:', error);
        return [];
    } else {
        console.log(`Successfully inserted ${insertedGames.length} games.`);
        return insertedGames.map(game => game.id);
    }
};

// Insert data into the user_gamification table
const insertUserGamification = async (userIds, gameIds, numRecords) => {
    const data = generateDummyUserGamification(userIds, gameIds, numRecords);

    const { error } = await supabase
        .from('user_gamification')
        .insert(data);

    if (error) {
        console.error('Error inserting user_gamification data:', error);
    } else {
        console.log(`Successfully inserted ${numRecords} user-game relationships.`);
    }
};

// Main function to run the script
const main = async () => {
    console.log('Inserting users...');
    const userIds = await insertUsers(100); // Generate 100 users

    console.log('Inserting gamification data...');
    const gameIds = await insertGamificationData(50); // Generate 50 games

    console.log('Inserting user-gamification relationships...');
    if (userIds.length > 0 && gameIds.length > 0) {
        await insertUserGamification(userIds, gameIds, 200); // Generate 200 relationships
    }
};

main().catch(err => console.error('Error running script:', err));
