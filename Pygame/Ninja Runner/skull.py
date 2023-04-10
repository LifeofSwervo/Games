import pygame

class Skull(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        
        #Movement
        skull0 = pygame.image.load('Assets\Enemies\Skull\Skull0.png')
        skull1 = pygame.image.load('Assets\Enemies\Skull\Skull1.png')
        skull2 = pygame.image.load('Assets\Enemies\Skull\Skull2.png')
        skull3 = pygame.image.load('Assets\Enemies\Skull\Skull3.png')
        skull4 = pygame.image.load('Assets\Enemies\Skull\Skull4.png')
        skull5 = pygame.image.load('Assets\Enemies\Skull\Skull5.png')
        skull6 = pygame.image.load('Assets\Enemies\Skull\Skull6.png')
        skull7 = pygame.image.load('Assets\Enemies\Skull\Skull7.png')
        self.skull = [skull0, skull1, skull2, skull3, skull4, skull5, skull6, skull7]
        self.skullIndex = 0
        
        #Surface & Rectangle
        self.image = self.skull[self.skullIndex]
        self.rect = self.image.get_rect(midbottom = (700, 190))

    def animation(self):
        self.skullIndex += 0.185
        if self.skullIndex >= len(self.skull): self.skullIndex = 0
        self.image = self.skull[int(self.skullIndex)]

    def movement(self):
        self.rect.x += -2.5
        
        #Reset
        if self.rect.x <= -200:
            self.rect.x = 850

    def update(self):
        self.animation()
        self.movement()