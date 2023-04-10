import pygame as pg
from settings import *
from player import Player
from level import Level

#Setup
pg.init()
screen = pg.display.set_mode((width,height))
pg.display.set_caption('Pong')
clock = pg.time.Clock()
font = pg.font.Font('font\Pixeltype.ttf', 50)
gameActive = False




# Intro Screen 
    # Name
gameName = font.render('Pong', False, (200, 200, 200))
gameNameRect = gameName.get_rect(center = (width / 2, height / 3))

    # Start Game
startGame = font.render('Press Space to start the game. ', False, (200, 200, 200))
startGameRect = startGame.get_rect(center = (width / 2, height - height / 4))

player = pg.sprite.GroupSingle()
player.add(Player(height))

level = Level(screen)

# Game Loop
while True:
    for event in pg.event.get():
        if event.type == pg.QUIT:
            pg.quit()
            exit()

    # Update Keys List
        if event.type == pg.KEYDOWN:
            if event.key == pg.K_SPACE:
                gameActive = True

    if gameActive:
        screen.fill('black')
        level.run()
        #screen.blit(score, scoreRect)
    else:# Start Screen
        screen.blit(gameName, gameNameRect)
        screen.blit(startGame, startGameRect)
        


    

    #Frame Rate       
    pg.display.update()
    clock.tick(60)