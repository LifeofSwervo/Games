import pygame
import time
import random

pygame.init() #Init

white = (255,255,255) #Colors
yellow = (255, 255, 102)
black = (0,0,0)
red = (213,50,80)
green = (0, 255, 0)
blue = (50,153,213)

displayWidth = 600 #Display
displayHeight = 400

display = pygame.display.set_mode((displayWidth,displayHeight)) #Window Size
pygame.display.set_caption("Snake Game")

clock = pygame.time.Clock()

snakeBlock = 10
snakeSpeed = 15

fontStyle = pygame.font.SysFont("bahnshrift", 25)
scoreFont = pygame.font.SysFont("comicsansms", 35)

def gameScore(score): #Score
    value = scoreFont.render("Your Score: " + str(score), True, yellow)
    display.blit(value, [200, 0])

def ourSnake(snakeBlock, snakeList): 
    for x in snakeList:
        pygame.draw.rect(display, black, [x[0], x[1], snakeBlock, snakeBlock])

def message(msg, color):
    mesg = fontStyle.render(msg, True, color)
    display.blit(mesg, [displayWidth / 6, displayHeight / 3])

def gameLoop(): #Creating a function
    gameOver = False
    gameClose = False

    x1 = displayWidth / 2
    y1 = displayHeight / 2

    x1_change = 0
    y1_change = 0

    snakeList = []
    lengthOfSnake = 1

    foodx = round(random.randrange(0, displayWidth - snakeBlock) / 10.0) * 10.0
    foody = round(random.randrange(0, displayHeight - snakeBlock) / 10.0) * 10.0

    while not gameOver:

        while gameClose == True:
            display.fill(blue)
            message("You Lost! Press Q to Quit or C to play again.", red)
            gameScore(lengthOfSnake - 1)
            pygame.display.update()

            for event in pygame.event.get(): #Quit or Play Again Script
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_q:
                        gameOver = True
                        gameClose = False
                    if event.key == pygame.K_c:
                        gameLoop()

        for event in pygame.event.get():  #Print events(Confirm Quit).
            if event.type == pygame.QUIT: 
                gameOver = True

            if event.type == pygame.KEYDOWN: #Movement
                if event.key == pygame.K_LEFT:
                    x1_change = -10
                    y1_change = 0
                elif event.key == pygame.K_RIGHT:
                    x1_change = 10
                    y1_change = 0
                elif event.key == pygame.K_UP:
                    y1_change = -10
                    x1_change = 0
                elif event.key == pygame.K_DOWN:
                    y1_change = 10
                    x1_change = 0

        if x1 >= displayWidth or x1 < 0 or y1 >= displayHeight or y1 < 0: #Fail State
            gameClose = True

        x1 += x1_change     #Assigns Movement Variables 
        y1 += y1_change        
        display.fill(blue) #Background
        pygame.draw.rect(display, green, [foodx, foody, snakeBlock, snakeBlock])

        snakeHead = [] #Snake body script
        snakeHead.append(x1)
        snakeHead.append(y1)
        snakeList.append(snakeHead)
        if len(snakeList) > lengthOfSnake:
            del snakeList[0]
        
        for x in snakeList[:-1]:
            if x == snakeHead:
                gameClose = True
        
        ourSnake(snakeBlock, snakeList) #Declare snake
        gameScore(lengthOfSnake - 1)

        #pygame.draw.rect(display, black, [x1, y1, snakeBlock, snakeBlock]) #Snake

        pygame.display.update()

        if x1 == foodx and y1 == foody:
            foodx = round(random.randrange(0, displayWidth - snakeBlock) / 10.0) * 10.0
            foody = round(random.randrange(0, displayHeight - snakeBlock) /10.0) * 10.0
            lengthOfSnake += 1

        clock.tick(snakeSpeed)

    pygame.quit()
    quit()

gameLoop()