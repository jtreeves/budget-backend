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
    income: 10000,
    categories: {
        housing: {
            inputs: {
                'rent': 500
            }
        },
        utility: {
            inputs: {
                'water': 50,
                'electric': 40
            }
        },
        food: {
            inputs: {
                'grocery': 100,
                'restaurant': 15
            }
        },
        transportation: {
            inputs: {
                'gas': 150
            }
        },
        entertainment: {
            inputs: {
                'books': 10,
                'movies': 5
            }
        },
        misc: {
            inputs: {
                'flower': 1
            }
        }
    }
}

const fullBudget = {
    title: 'My Very Own Budget',
    colorScheme: 'Purple',
    location: 'Atlanta, GA',
    income: 50000,
    categories: {
        housing: {
            inputs: {
                'rent': 974.86
            }
        },
        utility: {
            inputs: {
                'water': 42.17,
                'electric': 112.94,
                'internet': 93.40,
                'phone': 78.48
            }
        },
        food: {
            inputs: {
                'grocery': 374.03,
                'restaurant': 64.79,
                'alcohol': 83.61
            }
        },
        transportation: {
            inputs: {
                'gas': 206.73,
                'car insurance': 163.28
            }
        },
        entertainment: {
            inputs: {
                'Netflix': 8.99,
                'Disney': 6.99,
                'Hulu': 11.99,
                'Spotify': 9.99,
                'HBO': 14.99
            }
        },
        misc: {
            inputs: {
                'health insurance': 237.52,
                'Dropbox': 11.99,
                'Microsoft': 9.99,
                'Google': 6,
                'iCloud': 0.99
            }
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
    full: fullBudget,
    empty: emptyBudget
}

module.exports = budgets