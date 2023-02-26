import pygame as pg

class Level:
	def __init__(self,surface):
		# level setup
		self.displaySurface = surface 
		
    def run(self):
        self.player.draw(self.displaySurface)