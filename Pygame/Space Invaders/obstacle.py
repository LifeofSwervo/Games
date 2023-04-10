import pygame

class Block(pygame.sprite.Sprite):
    def __init__(self, size, color, x, y):
        super().__init__()
        self.image = pygame.Surface((size, size))
        self.image.fill(color)
        self.rect = self.image.get_rect(topleft = (x, y))

shape = [ #Row Index
'  xxxxxxx', # Row 0
' xxxxxxxxx', # Row 1
'xxxxxxxxxxx', #Row 2
'xxxxxxxxxxx', # Row 3
'xxxxxxxxxxx', # Row 4
'xxx     xxx', # Row 5
'xx       xx'] # Row 6 