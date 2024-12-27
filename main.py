import random
import uuid

class Player:
    def __init__(self, username, avatar_url):
        self.username = username
        self.avatar_url = avatar_url
        self.deck = []
        self.hand = []
        self.field = []  # Cards currently in play
        self.graveyard = []

    def draw_card(self):
        if self.deck:
            card = self.deck.pop(0)
            self.hand.append(card)
        else:
            print(f"{self.username} has no cards left in their deck.")

class Card:
    def __init__(self, name, card_type, attack, defense, special_ability=None):
        self.name = name
        self.card_type = card_type  # e.g., "Creature", "Spell", "Item"
        self.attack = attack
        self.defense = defense
        self.special_ability = special_ability

    def __str__(self):
        return f"{self.name} ({self.card_type}) - ATK:{self.attack} DEF:{self.defense}"

def create_player(username, avatar_url):
    return Player(username, avatar_url)

def create_card(name, card_type, attack, defense, special_ability=None):
    return Card(name, card_type, attack, defense, special_ability)

def build_deck(player):
    # Example: Build a sample deck for the player
    player.deck = [
        create_card("Fireball", "Spell", 0, 0, "Deal 3 damage to an enemy creature."),
        create_card("Giant", "Creature", 5, 5, None),
        create_card("Goblin", "Creature", 2, 1, None),
        # Add more cards here
    ]

def start_game(player1, player2):
    # Shuffle decks
    random.shuffle(player1.deck)
    random.shuffle(player2.deck)

    # Draw initial hand
    for _ in range(5):
        player1.draw_card()
        player2.draw_card()

    # Game loop (simplified)
    current_player = player1
    while True:
        print(f"{current_player.username}'s turn.")
        # ... (Implement turn logic here: playing cards, attacking, etc.)
        # ... (Handle game end conditions: victory, defeat, draw)
        current_player = player2 if current_player == player1 else player1

# Example usage
player1 = create_player("Player1", "avatar1.png")
player2 = create_player("Player2", "avatar2.png")

build_deck(player1)
build_deck(player2)

start_game(player1, player2)