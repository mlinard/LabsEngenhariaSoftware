class SteamGameModel {
  constructor() {
    this.steamGames = [];
    this.listeners = [];
    this.isLoading = false;
    this.isLoaded = false;

    // Load Steam games when the model is instantiated
    this.loadSteamGames();
  }

  // Add a listener for Steam game data changes
  addListener(callback) {
    this.listeners.push(callback);
  }

  // Notify all observers of changes
  notifyListeners() {
    this.listeners.forEach((callback) => callback(this.steamGames));
  }

  // Load Steam games from the database
  async loadSteamGames() {
    if (this.isLoading) {
      console.log("🔄 Steam games already loading...");
      return;
    }

    this.isLoading = true;
    this.isLoaded = false;
    console.log("🎮 Starting to load Steam games...");

    try {
      // Fetch games from the database API endpoint
      console.log(
        "📡 Fetching from http://http://56.124.70.84:3000/api/steam-games..."
      );

      const response = await fetch(
        "http://http://56.124.70.84:3000/api/steam-games",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors", // Explicitly set CORS mode
        }
      );

      console.log("📡 Response status:", response.status);
      console.log("📡 Response ok:", response.ok);
      console.log(
        "📡 Response headers:",
        Object.fromEntries(response.headers.entries())
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("📡 Response error text:", errorText);
        throw new Error(
          `Failed to fetch Steam games: ${response.status} ${response.statusText} - ${errorText}`
        );
      }

      const games = await response.json();
      console.log("📦 Raw games data received:", games);
      console.log("📦 Number of games received:", games.length);

      if (!Array.isArray(games)) {
        throw new Error("Invalid response format: expected array");
      }

      // Transform the data to match our game model format
      this.steamGames = games.map((game) => ({
        id: `steam_${game.id}`, // Prefix with 'steam_' to avoid ID conflicts
        steamId: game.id, // Keep original Steam ID
        title: game.name,
        platform: "PC (Steam)",
        genre: this.getGenreFromName(game.name), // Try to determine genre from name
        description: `${game.name} - Disponível na Steam`,
        rating: this.generateRatingFromName(game.name), // Generate rating based on game name
        imageUrl: game.image || "https://placehold.co/300x200?text=Steam+Game",
        price: game.price / 100, // Convert from cents to currency
        reviews: [],
        isSteamGame: true, // Flag to identify Steam games
      }));

      console.log("🎯 Transformed Steam games:", this.steamGames);
      console.log("🎯 Number of transformed games:", this.steamGames.length);

      this.isLoaded = true;

      // Notify listeners about the new data
      this.notifyListeners();
      console.log(
        "✅ Steam games loaded successfully:",
        this.steamGames.length
      );
    } catch (error) {
      console.error("❌ Error loading Steam games:", error);
      console.error("❌ Error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name,
      });

      // Check if it's a network error
      if (error instanceof TypeError && error.message.includes("fetch")) {
        console.error(
          "❌ Network error - is the API server running on port 3000?"
        );
      }

      // Initialize empty array if API fails
      this.steamGames = [];
      this.isLoaded = false;
      this.notifyListeners();
    } finally {
      this.isLoading = false;
    }
  }

  // Try to determine genre from game name (basic heuristic)
  getGenreFromName(name) {
    const lowerName = name.toLowerCase();

    if (
      lowerName.includes("ring") ||
      lowerName.includes("souls") ||
      lowerName.includes("rpg")
    ) {
      return "RPG, Ação, Mundo Aberto";
    } else if (
      lowerName.includes("cyberpunk") ||
      lowerName.includes("sci-fi")
    ) {
      return "RPG, Ação, Mundo Aberto, Sci-Fi";
    } else if (lowerName.includes("knight") || lowerName.includes("hollow")) {
      return "Metroidvania, Ação, Aventura, Indie";
    } else if (lowerName.includes("war") || lowerName.includes("god")) {
      return "Ação, Aventura";
    } else if (lowerName.includes("gate") || lowerName.includes("baldur")) {
      return "RPG, Estratégia, Fantasia";
    } else if (lowerName.includes("witcher")) {
      return "RPG, Ação, Mundo Aberto";
    } else if (lowerName.includes("hades")) {
      return "Roguelike, Ação, Indie";
    }

    return "Ação, Aventura"; // Default genre
  }

  // Generate a rating based on game name (basic heuristic for popular games)
  generateRatingFromName(name) {
    const lowerName = name.toLowerCase();

    // High-rated games
    if (lowerName.includes("elden ring") || lowerName.includes("baldur")) {
      return 9.6;
    } else if (lowerName.includes("witcher") || lowerName.includes("hades")) {
      return 9.5;
    } else if (
      lowerName.includes("god of war") ||
      lowerName.includes("hollow knight")
    ) {
      return 9.4;
    } else if (lowerName.includes("cyberpunk")) {
      return 8.5;
    }

    // Default rating for other games
    return 8.0;
  }

  // Get all Steam games
  getAllSteamGames() {
    console.log("🎮 SteamGameModel.getAllSteamGames() called");
    console.log("🎮 Current steamGames array:", this.steamGames);
    console.log("🎮 steamGames length:", this.steamGames.length);
    console.log("🎮 isLoaded:", this.isLoaded);
    console.log("🎮 isLoading:", this.isLoading);
    return this.steamGames;
  }

  // Get a specific Steam game by ID
  getSteamGameById(id) {
    console.log("🔍 Looking for Steam game with ID:", id);
    console.log(
      "🔍 Available Steam games:",
      this.steamGames.map((g) => ({
        id: g.id,
        steamId: g.steamId,
        title: g.title,
      }))
    );

    // Try exact match first
    let game = this.steamGames.find(
      (game) => game.id === id || game.steamId === id
    );

    // If not found and id is a string, try different formats
    if (!game && typeof id === "string") {
      // Try with steam_ prefix if not present
      if (!id.startsWith("steam_")) {
        game = this.steamGames.find(
          (game) => game.id === `steam_${id}` || game.steamId === id
        );
      }
      // Try without steam_ prefix if present
      else {
        const numericId = id.replace("steam_", "");
        game = this.steamGames.find(
          (game) =>
            game.steamId === numericId || game.steamId === parseInt(numericId)
        );
      }
    }

    // If not found and id is a number, try string conversion
    if (!game && typeof id === "number") {
      const stringId = id.toString();
      game = this.steamGames.find(
        (game) =>
          game.id === `steam_${stringId}` ||
          game.steamId === stringId ||
          game.steamId === id
      );
    }

    console.log(
      "🔍 Steam game lookup result:",
      game ? `Found: ${game.title}` : "Not found"
    );
    return game;
  }

  // Get top-rated Steam games
  getTopSteamGames(limit = 5) {
    return [...this.steamGames]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }

  // Check if Steam games are loaded
  isGamesLoaded() {
    return this.isLoaded;
  }

  // Check if Steam games are currently loading
  isGamesLoading() {
    return this.isLoading;
  }
}

// Create a singleton instance
const steamGameModel = new SteamGameModel();

export default steamGameModel;
