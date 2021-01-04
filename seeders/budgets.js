const richBudget = {
    title: 'Fancy Rich Budget',
    colorScheme: 'Green',
    location: 'New York, NY',
    income: 1000000,
    categories: {
        housing: {
            inputs: {
                'rent': 2000
            }
        },
        utility: {
            inputs: {
                'water': 200,
                'electric': 400
            }
        },
        food: {
            inputs: {
                'grocery': 1000,
                'restaurant': 1500
            }
        },
        transportation: {
            inputs: {
                'gas': 250,
                'planes': 1345
            }
        },
        entertainment: {
            inputs: {
                'books': 750,
                'movies': 850
            }
        },
        misc: {
            inputs: {
                'carnival': 10000
            }
        }
    }
}

const poorBudget = {
    title: 'Unfortuante Poor Budget',
    colorScheme: 'Red',
    location: 'Portland, OR',
    income: 100000,
    categories: {
        housing: {
            rent: 500
        },
        utility: {
            water: 50,
            electric: 40
        },
        food: {
            grocery: 100,
            restaurant: 15
        },
        transportation: {
            gas: 150
        },
        entertainment: {
            books: 10,
            movies: 5
        },
        misc: {
            flower: 1
        }
    }
}

const emptyBudget = {
    title: 'My First Budget',
    colorScheme: 'Blue',
    location: 'Philadelphia, PA',
    income: 25000,
    categories: {
        housing: {inputs: {}},
        utility: {inputs: {}},
        food: {inputs: {}},
        transportation: {inputs: {}},
        entertainment: {inputs: {}},
        misc: {inputs: {}}
    }
}

const budgets = {
    rich: richBudget,
    poor: poorBudget,
    empty: emptyBudget
}

module.exports = budgets