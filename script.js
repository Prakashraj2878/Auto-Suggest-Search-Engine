class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }

    searchPrefix(prefix) {
        let node = this.root;
        for (let char of prefix) {
            if (!node.children[char]) {
                return null;
            }
            node = node.children[char];
        }
        return node;
    }

    autoComplete(prefix) {
        let node = this.searchPrefix(prefix);
        if (!node) return [];
        let results = [];
        this.collectAllWords(node, prefix, results);
        return results;
    }

    collectAllWords(node, prefix, results) {
        if (node.isEndOfWord) {
            results.push(prefix);
        }
        for (let char in node.children) {
            this.collectAllWords(node.children[char], prefix + char, results);
        }
    }
}

// Initialize the Trie and add some sample words
const trie = new Trie();
    const words = [
        "the", "be", "to", "of", "and", "a", "in", "that", "have", "it", 
        "you", "he", "at", "or", "by", "this", "but", "not", "all", "she", 
        "they", "we", "say", "his", "from", "that", "what", "there", "out", 
        "up", "if", "about", "who", "get", "which", "go", "when", "make", 
        "can", "like", "time", "no", "just", "him", "know", "take", "people", 
        "into", "year", "your", "good", "some", "could", "them", "see", 
        "other", "than", "then", "now", "look", "only", "come", "its", 
        "over", "think", "also", "back", "after", "use", "two", "how", 
        "our", "work", "first", "well", "way", "even", "new", "want", 
        "because", "any", "these", "give", "day", "most", "us", "no", 
        "such", "here", "between", "own", "both", "an", "would", "all", 
        "there", "about", "still", "own", "few", "say", "same", "while", 
        "those", "through", "life", "work", "may", "where", "down", "back", 
        "little", "each", "man", "like", "my", "after", "through", "only", 
        "time", "any", "great", "old", "tell", "little", "both", "why", 
        "hand", "house", "give", "come", "old", "year", "life", "high", 
        "thing", "end", "different", "begin", "next", "part", "try", 
        "place", "might", "long", "real", "well", "should", "ask", "last", 
        "own", "day", "point", "look", "good", "seem", "much", "man", 
        "keep", "see", "over", "home", "need", "go", "year", "take", 
        "talk", "leave", "call", "talk", "problem", "some", "against", 
        "under", "look", "right", "home", "find", "few", "keep", 
        "turn", "still", "better", "give", "hand", "start", "come", 
        "city", "come", "school", "should", "night", "side", "down", 
        "part", "hand", "high", "family", "those", "next", "point", 
        "even", "point", "ask", "back", "side", "leave", "small", 
        "great", "end", "face", "face", "road", "word", "start", 
        "place", "part", "move", "ever", "back", "come", "big", 
        "different", "bring", "group", "old", "place", "home", "might", 
        "over", "next", "very", "great", "right", "try", "little", 
        "now", "look", "school", "down", "head", "while", "day", 
        "time", "first", "large", "little", "group", "great", 
        "young", "eye", "head", "long", "woman", "woman", "again", 
        "year", "read", "give", "number", "keep", "speak", "live", 
        "eat", "start", "next", "man", "face", "find", "thing", 
        "stop", "face", "face", "stay", "turn", "young", "high", 
        "leave", "next", "time", "large", "good", "few", "many", 
        "take", "first", "like", "big", "make", "right", "like", 
        "need", "man", "between", "end", "every", "have", "may", 
        "want", "need", "keep", "get", "little", "call", "still", 
        "long", "different", "need", "last", "become", "important", 
        "take", "speak", "few", "place", "man", "end", "run", 
        "come", "man", "never", "young", "each", "first", "together", 
        "long", "find", "three", "find", "put", "try", "take", 
        "life", "never", "old", "young", "talk", "high", "back", 
        "two", "look", "never", "school", "woman", "long", "back", 
        "bring", "great", "hand", "side", "down", "face", "day", 
        "again", "thing", "call", "take", "great", "many", "need", 
        "down", "go", "come", "find", "give", "year", "ask", 
        "take", "each", "ask", "good", "high", "left", "make", 
        "try", "day", "ever", "two", "back", "under", "two", 
        "ask", "know", "own", "give", "young", "old", "year", 
        "way", "may", "new", "want", "long", "give", "long", 
        "last", "never", "out", "man", "over", "have", "very", 
        "find", "down", "up", "could", "go", "point", "some", 
        "find", "new", "last", "two", "man", "together", "life", 
        "come", "put", "feel", "few", "most", "old", "good", 
        "day", "long", "young", "first", "bring", "big", "ask", 
        "need", "two", "great", "call", "two", "come", "face", 
        "down", "go", "never", "bring", "move", "old", "high", 
        "give", "two", "each", "great", "try", "different", 
        "good", "small", "two", "own", "little", "number", 
        "place", "number", "little", "high", "make", "never", 
        "young", "good", "go", "have", "ask", "big", "young"
    
];
words.forEach(word => trie.insert(word));

// Show suggestions as user types
function showSuggestions() {
    const input = document.getElementById('search-input').value.toLowerCase();
    const suggestionsBox = document.getElementById('suggestions');
    suggestionsBox.innerHTML = '';  // Clear previous suggestions

    if (input.length === 0) return;  // No input, no suggestions

    const suggestions = trie.autoComplete(input);

    suggestions.forEach(suggestion => {
        const li = document.createElement('li');
        li.textContent = suggestion;
        li.addEventListener('click', () => {
            document.getElementById('search-input').value = suggestion;
            suggestionsBox.innerHTML = '';  // Clear suggestions on selection
        });
        suggestionsBox.appendChild(li);
    });
}