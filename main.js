var deck;
var suits = ["spades", "diamonds", "clubs", "hearts"];
var values = ["A", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var players = new Array();

var currentPlayer;

function startGame()
{
    document.getElementById("btnStart").value = "Restart";
    document.getElementById("status").style.display = "none";

    currentPlayer = 0;
    getDeck();
    shuffle();
    createPlayers(2);
    createPlayersUI();
    dealHands();
    document.getElementById("player_" + currentPlayer).classList.add("active");
}
function getDeck()
{
    deck = new Array();
    
    for(var i = 0; i < suits.length; i++)
    {
        for(var j = 0; j < values.length; j++)
        {
            var weight = parseInt(values[i]);
            
            if(values[i] === "J" || values[i] === "Q" || values[i] === "K")
            {
                weight = 10;
            }
            else if(values[i] === "A")
            {
                weight = 11;
            }
            var card = {Value: values[j], Suit: suits[i]};
            deck.push(card);
        }
    }
    return deck;
}

function shuffle()
{
    for(var i = 0; i < 1000; i++)
    {
        var location1 = Math.floor((Math.random() * deck.length));
        var location2 = Math.floor((Math.random() * deck.length));
        var temp = deck[location1];

        deck[location1] = deck[location2];
        deck[location2] = temp;
    }
}

function createPlayers(num)
{
    players = new Array();

    for(var i = 1; i <= num; i++)
    {
        var hand = new Array();
        var player = {Name: "Player " + i, ID: i, Points: 0, Hand: hand};
        players.push(player);
    }
}

function createPlayersUI()
{
    document.getElementById("players").innerHTML = "";

    for(var i = 0; i < players.length; i++)
    {
        var div_player = document.createElement("div");
        var div_playerId = document.createElement("div");
        var div_hand = document.createElement("div");
        var div_points = document.createElement("div");

        div_points.className = "points";
        div_points.id = "points_" + i;
        div_player.className = "player";
        div_player.id = "player_" + i;
        div_hand.id = "hand_" + i;

        div_playerId.innerHTML = players[i].ID;
        div_player.appendChild(div_playerId);
        div_player.appendChild(div_hand);
        div_player.appendChild(div_points);
        document.getElementById("players").appendChild(div_player);
    }
}

function dealHands()
{
    for(var i = 0; i < 2; i++)
    {
        for(var j = 0; j < players.length; j++)
        {
            var card = deck.pop();
            players[i].Hand.push(card);
            renderCard(card, j);
            updatePoints();
        }
    }
    updateDeck();
}

function renderCard(card, player)
{
    var hand = document.getElementById("hand_" + player);
    hand.appendChild(getCardUI(card));
}

function getCardUI(card)
{
    var el = document.createElement("div");
    el.className = "card";
    el.innerHTML = card.Suit + " " + card.Value;
    return el;
}

function hitMe()
{
    // pop a card from the deck to the current player
    // check if current player new points are over 21
    var card = deck.pop();
    players[currentPlayer].Hand.push(card);
    renderCard(card, currentPlayer);
    updatePoints();
    check();
}

function check()
{
    if(players[currentPlayer].Points > 21)
    {
        document.getElementById("status").innerHTML = "Player: " + players[currentPlayer].ID + " LOST";
    }
}

function stay()
{
    if(currentPlayer != players.length - 1)
    {
        document.getElementById("player_" + currentPlayer).classList.remove("active");
        currentPlayer += 1;
        document.getElementById("player_" + currentPlayer).classList.add("active");
    }

    else
    {
        end();
    }
}

function end()
{
    var winner = -1;
    var score = 0;
    
    for(var i = 0; i < players.length; i++)
    {
        if(players[i].Points > score && players[i].Points < 22)
        {
            winner = i;
        }

        score = players[i].Points;
    }
    document.getElementById("status").innerHTML = "Winner: Player " + players[winner].ID;
}

// function renderDeck()
// {
//     document.getElementById("deck").innerHTML = "";

//     for(var i = 0; i < deck.length; i++)
//     {
//         var card = document.createElement("div");
//         var value = document.createElement("div");
//         var suit = document.createElement("div");

//         card.className = "card";
//         value.className = "value";
//         suit.className = "suit " + deck[i].Suit;

//         value.innerHTML = deck[i].Value;
//         card.appendChild(value);
//         card.appendChild(suit);

//         document.getElementById("deck").appendChild(card);
//     }
// }