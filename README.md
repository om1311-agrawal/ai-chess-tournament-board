# 🏆 AI Chess Tournament Leaderboard

An interactive web-based leaderboard for tracking and visualizing AI chess tournament results. This tool displays player rankings, statistics, and the AI model configurations (prompts and parameters) used by each participant.

![Chess Tournament](https://img.shields.io/badge/Tournament-Chess-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🌟 Features

### 📊 Dynamic Sorting
- Sort players by **Rank**, **Win Rate**, or **Rating (μ)**
- Toggle between ascending and descending order
- Active sort indicator

### 📌 Pin Functionality
- Pin favorite players to the top of the leaderboard
- Pinned players remain visible regardless of sort order
- Visual indicator for pinned entries

### 🎨 Smart Highlighting
- **Top 3 Players**: Highlight the top three performers (gold accent)
- **High Win Rate**: Highlight players with >80% win rate (green accent)
- Toggle between highlighting modes via dropdown

### 🤖 AI Model Details
- Click any player to view their complete configuration:
  - Model provider (OpenAI, Gemini, etc.)
  - Model name and version
  - Temperature and other parameters
  - System prompts
  - Step-wise gameplay prompts

### 💎 UI/UX
- Modern, responsive design
- Smooth animations and transitions
- Visual win rate progress bars
- Medal badges for top 3 ranks (🥇🥈🥉)
- Dark-themed prompt display
- Sticky table headers

## 🚀 Quick Start

### Prerequisites
- Node.js (v12 or higher)
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/ai-chess-tournament-board.git
   cd ai-chess-tournament-board
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Process the tournament data**
   ```bash
   node process_data.js
   ```
   This will generate `leaderboard_data.json` from the CSV standings and YAML configuration files.

4. **Start the server**
   ```bash
   npm start
   ```
   The leaderboard will open automatically at `http://localhost:8080/leaderboard.html`

## 📁 Project Structure

```
ai-chess-tournament-board/
├── data/
│   ├── final_standings.csv          # Player rankings and statistics
│   └── prompt_collection/           # YAML files with AI configurations
│       ├── player1_config.yml
│       ├── player2_config.yml
│       └── ...
├── leaderboard.html                 # Main interactive interface
├── process_data.js                  # Data processing script
├── leaderboard_data.json           # Generated combined data
├── package.json                     # Node dependencies
└── README.md
```

## 📊 Data Format

### CSV Structure (final_standings.csv)
```csv
Rank,Player,Rating_Mu,Rating_Sigma,Wins,Draws,Losses,Games,Win_Rate
1,player1,43.86,3.48,12,0,0,12,1.000
```

### YAML Structure (player_config.yml)
```yaml
agent0:
  model:
    provider: "OpenAI"
    name: "gpt-4"
    params:
      temperature: 1.0
  prompts:
    system_prompt: |
      Your system prompt here...
    step_wise_prompt: |
      Your gameplay prompt here...
```

## 🎮 Usage

### Viewing the Leaderboard
1. Open `http://localhost:8080/leaderboard.html` in your browser
2. Browse the ranked list of players and their statistics

### Sorting
- Click **Rank**, **Win Rate**, or **Rating (μ)** buttons to sort
- Click again to reverse the sort order

### Pinning Players
- Click the pin icon (📍) next to any player to pin them
- Pinned players appear at the top with a gold background
- Click again to unpin

### Highlighting
- Use the **Highlight** dropdown to select:
  - **None**: Standard view
  - **Top 3 Players**: Highlights ranks 1-3
  - **Win Rate > 0.8**: Highlights high performers

### Viewing AI Details
- Click any player row to open their detail modal
- View complete statistics, model configuration, and prompts
- Close with X button, click outside, or press ESC

## 🔧 Customization

### Adding New Tournament Data
1. Replace `data/final_standings.csv` with your tournament results
2. Add player YAML configuration files to `data/prompt_collection/`
3. Run `node process_data.js` to regenerate the data
4. Refresh the leaderboard

### Modifying Highlight Thresholds
Edit line 440 in `leaderboard.html`:
```javascript
} else if (highlightMode === 'winrate' && player.win_rate > 0.8) {
    // Change 0.8 to your desired threshold
```

### Styling
All styles are embedded in `leaderboard.html`. Modify the `<style>` section to customize colors, fonts, and layout.

## 📦 Dependencies

- **yaml**: YAML parsing for configuration files
- **http-server**: Local development server

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📄 License

This project is licensed under the MIT License - feel free to use it for your own tournaments!

## 🎯 Use Cases

- **AI/LLM Chess Tournaments**: Track games between different AI models
- **Classroom Competitions**: Display student rankings and strategies
- **Research Projects**: Compare different prompt engineering approaches
- **Tournament Hosting**: Professional leaderboard for any competition format

## 🙏 Acknowledgments

Built for tracking AI chess tournament results with detailed model configuration analysis.

---

**Made with ❤️ for AI competitions**

