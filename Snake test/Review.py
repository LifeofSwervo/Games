import pygame
import time
import random

pygame.init() #Init

white = (215, 216, 231) #Colors
yellow = (255, 255, 102)
black = (0, 0, 0)
red = (213, 50, 80)
green = (0, 255, 0)
blue = (50, 153, 213)

disWidth = 600 #Dimensions
disHeight = 400

dis = pygame.display.set_mode((disWidth, disHeight))
pygame.display.set_caption("Snake Review") 

#Declarations
clock = pygame.time.Clock()

snakeBlock = 10
snakeSpeed = 15

fontStyle = pygame.font.SysFont("bahnshrift", 25)
scoreFont = pygame.font.SysFont("comicsansms", 35)

def gameScore(score): #Score
    value = scoreFont.render("Your Score: " + str(score), True, yellow)
    dis.blit(value, [0, 0])

def ourSnake(snakeBlock, snakeList):
    for x in snakeList:
        pygame.draw.rect(dis, black, [x[0], x[1], snakeBlock, snakeBlock])

def message(msg, color):
    mesg = fontStyle.render(msg, True, color)
    dis.blit (mesg, [disWidth / 6, disHeight / 3])

# Loop
def gameLoop(): 
    gameOver = False 
    gameClose = False #Make sure game is on

    x1 = disWidth / 2 #Place snake in the middle of the screen
    y1 = disHeight / 2

    x1_movement = 0
    y1_movement = 0

    snakeList = [] #Snake data in list
    lengthOfSnake = 1

    foodx = round(random.randrange(0, disWidth - snakeBlock) / 10.0) * 10.0 #Food 
    foody = round(random.randrange(0, disHeight - snakeBlock) / 10.0) * 10.0

    while not gameOver:

        while gameClose == True: #Failed Game State
            dis.fill(blue)
            message("You Lost! Press Q to restart. Press C to play again", red)
            gameScore(lengthOfSnake - 1)
            pygame.display.update()

            for event in pygame.event.get(): 
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_q: #Quit Game
                        gameOver = True
                        gameClose = False
                    if event.key == pygame.K_c: #Play Again
                        gameLoop()
                
        for event in pygame.event.get(): #Confirm Quit
            if event.type == pygame.QUIT:
                gameOver = True

            if event.type == pygame.KEYDOWN: #Movement
                if event.key == pygame.K_LEFT:
                    x1_movement = -10
                    y1_movement = 0
                elif event.key == pygame.K_RIGHT:
                    x1_movement = 10
                    y1_movement =  0
                elif event.key == pygame.K_UP:
                    y1_movement = -10
                    x1_movement = 0
                elif event.key == pygame.K_DOWN:
                    y1_movement = 10
                    x1_movement = 0

        if x1 >= disWidth or x1 < 0 or y1 >= disHeight or y1 < 0: #Borders
            gameClose = True

        x1 += x1_movement #Assign movement
        y1 += y1_movement
        dis.fill(blue) # Background
        pygame.draw.rect(dis, green, [foodx, foody, snakeBlock, snakeBlock])

        snakeHead = [] #Snake body script
        snakeHead.append(x1)
        snakeHead.append(y1)
        snakeList.append(snakeHead)
        if len(snakeList) > lengthOfSnake:
            del snakeList[0]

        for x in snakeList[:-1]:
            if x == snakeHead:
                gameClose == True
        
        ourSnake(snakeBlock, snakeList) #Declare snake
        gameScore(lengthOfSnake - 1)

        pygame.display.update()

        if x1 == foodx and y1 == foody:
            foodx = round(random.randrange(0, disWidth - snakeBlock) / 10.0) * 10.0
            foody = round(random.randrange(0, disHeight - snakeBlock) /10.0) * 10.0
            lengthOfSnake += 1

        clock.tick(snakeSpeed)

    pygame.quit()
    quit()

gameLoop()
