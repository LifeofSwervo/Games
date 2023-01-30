import pygame

class Arrow(pygame.sprite.Sprite):
    def __init__(self, pos, y = 10, speed = -8):
        super().__init__()
        self.image = pygame.image.load("Assets/Player/Misc/Arrow0.png")
        self.rect = self.image.get_rect(center = pos)
        self.y = y
        self.speed = speed
       

    def update(self):
        self.rect.x -= self.speed
        self.rect.y += self.y
        if self.rect.y >= 10:
            self.rect.y = 175                                                 
