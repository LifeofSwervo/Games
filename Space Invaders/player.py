import pygame

class Player(pygame.sprite.Sprite):
    def __init__(self, pos, constraint, speed):
        super().__init__()
        self.image = pygame.image.load('Graphics/Player/player.png').convert_alpha()
        self.rect = self.image.get_rect(midbottom = pos)
        self.speed = speed
        self.maxXConstraint = constraint # Set constraint as screenwidth.

    def getInput(self):
        keys = pygame.key.get_pressed()

        if keys[pygame.K_RIGHT]:
            self.rect.x += self.speed
        elif keys[pygame.K_LEFT]:
            self.rect.x -= self.speed

    def constraint(self):
        if self.rect.left <= 0:
            self.rect.left = 0
        if self.rect.right >= self.maxXConstraint:
            self.rect.right = self.maxXConstraint

    def update(self):
        self.getInput()
        self.constraint()