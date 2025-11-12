const fs = require('fs');
const path = require('path');
const yaml = require('yaml');

// Read the standings CSV
const standingsPath = './data/final_standings.csv';
const promptCollectionPath = './data/prompt_collection';

function parseCSV(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.trim().split('\n');
    const headers = lines[0].split(',');

    return lines.slice(1).map(line => {
        const values = line.split(',');
        const player = {};
        headers.forEach((header, index) => {
            player[header] = values[index];
        });
        return player;
    });
}

function findYAMLFile(playerName, promptDir) {
    const files = fs.readdirSync(promptDir);
    const yamlFile = files.find(file =>
        file.toLowerCase().startsWith(playerName.toLowerCase()) &&
        (file.endsWith('.yml') || file.endsWith('.yaml'))
    );
    return yamlFile ? path.join(promptDir, yamlFile) : null;
}

function extractAgent0Info(yamlPath) {
    try {
        const content = fs.readFileSync(yamlPath, 'utf-8');
        const data = yaml.parse(content);

        if (data && data.agent0) {
            return {
                model: {
                    provider: data.agent0.model?.provider || 'N/A',
                    name: data.agent0.model?.name || 'N/A',
                    params: data.agent0.model?.params || {}
                },
                prompts: {
                    system_prompt: data.agent0.prompts?.system_prompt || 'N/A',
                    step_wise_prompt: data.agent0.prompts?.step_wise_prompt || 'N/A'
                }
            };
        }
        return null;
    } catch (error) {
        console.error(`Error parsing ${yamlPath}:`, error.message);
        return null;
    }
}

function generateLeaderboardData() {
    const players = parseCSV(standingsPath);
    const leaderboard = [];

    console.log('Processing players...\n');

    for (const player of players) {
        const playerName = player.Player;
        const yamlFile = findYAMLFile(playerName, promptCollectionPath);

        let agent0Info = null;
        if (yamlFile) {
            agent0Info = extractAgent0Info(yamlFile);
            if (!agent0Info) {
                console.warn(`Could not extract agent0 info for ${playerName}`);
            }
        } else {
            console.warn(`YAML file not found for ${playerName}`);
        }

        leaderboard.push({
            rank: parseInt(player.Rank),
            player: playerName,
            rating_mu: parseFloat(player.Rating_Mu),
            rating_sigma: parseFloat(player.Rating_Sigma),
            wins: parseInt(player.Wins),
            draws: parseInt(player.Draws),
            losses: parseInt(player.Losses),
            games: parseInt(player.Games),
            win_rate: parseFloat(player.Win_Rate),
            agent0: agent0Info
        });
    }

    return leaderboard;
}

// Main execution
try {
    const leaderboard = generateLeaderboardData();
    const outputPath = './leaderboard_data.json';
    fs.writeFileSync(outputPath, JSON.stringify(leaderboard, null, 2));
    console.log(`Leaderboard data saved to: ${outputPath}`);
    console.log(`Total players processed: ${leaderboard.length}`);
} catch (error) {
    console.error('Error generating leaderboard:', error);
}
