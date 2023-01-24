import pygame

class Arrow(pygame.sprite.Sprite):
    def __init__(self, pos):
        super().__init__()
        self.image = pygame.image.load("Assets/Player/Misc/Arrow0")
        self.rect = self.image.get_rect(center = pos)