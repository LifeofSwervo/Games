import pygame, sys
from settings import * 
from tiles import Tile
from level import Level

# Pygame setup
pygame.init()
screen = pygame.display.set_mode((screenWidth, screenHeight))
clock = pygame.time.Clock()
pygame.display.set_caption('Platformer')

level = Level(levelMap, screen)

while True:
	for event in pygame.event.get():
		if event.type == pygame.QUIT:
			pygame.quit()
			sys.exit()
	
	screen.fill('black')
	level.run()
	
	pygame.display.update()
	clock.tick(60)