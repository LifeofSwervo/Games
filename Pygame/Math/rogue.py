gameStarted = False
sword = False

print("Welcome to the game")
userInput = input('Hello, to start the game type "R"\n')

if userInput == "R" or userInput == "r":
    print("Let's start the game\n")
    gameStarted = True
else:
    print("Goodbye\n")

while gameStarted == True:
    userInput = input("You are in a cave, that splits. Do you go left or right? (L/R)\n")
    if userInput == "L" or userInput == "l":
        print("You go left, while walking you see a sword on the ground.\n")
        swordPickup = input("Do you pick it up or leave it? (Y/N)\n")
    elif userInput == "R" or userInput == "r":
        print("You go right, while walking you see a monster.\n")
    else:
        print("Invalid input\n")
 

    

