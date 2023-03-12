import pygame as pg
from settings import *
from player import Player
from level import Level

#Setup
pg.init()
screen = pg.display.set_mode((width,height))
pg.display.set_caption('Pong')
clock = pg.time.Clock()

player = pg.sprite.GroupSingle()
player.add(Player(height))

level = Level(screen)


#Game Loop
while True:
    for event in pg.event.get():
        if event.type == pg.QUIT:
            pg.quit()
            exit()

    screen.fill('black')
    level.run()

    

    #Frame Rate       
    pg.display.update()
    clock.tick(60)