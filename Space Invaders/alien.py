import pygame

class Alien(pygame.sprite.Sprite):
    def __init__(self, color, x, y):
        super().__init__()
        filePath = 'Graphics/' + color + '.png'
        self.image = pygame.image.load(filePath).convert_alpha
        self.rect = self.image.get_rect(topleft = (x, y))