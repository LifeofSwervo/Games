import pygame
from laser import Laser

class Player(pygame.sprite.Sprite):
    def __init__(self, pos, constraint, speed):
        super().__init__()
        self.image = pygame.image.load('Graphics/Player/player.png').convert_alpha()
        self.rect = self.image.get_rect(midbottom = pos)
        self.speed = speed
        self.maxXConstraint = constraint # Set constraint as screenwidth.
        self.ready = True

        # Laser
        self.laserTime = 0
        self.laserCooldown = 600 
        self.lasers = pygame.sprite.Group()

    def getInput(self):
        keys = pygame.key.get_pressed()

        if keys[pygame.K_RIGHT]:
            self.rect.x += self.speed
        elif keys[pygame.K_LEFT]:
            self.rect.x -= self.speed

        if keys[pygame.K_SPACE] and self.ready:
            self.shootLaser()
            self.ready = False
            self.laserTime = pygame.time.get_ticks()

    def recharge(self):
        if not self.ready:
            currentTime = pygame.time.get_ticks()
            if currentTime - self.laserTime >= self.laserCooldown:
                self.ready = True

    def constraint(self):
        if self.rect.left <= 0:
            self.rect.left = 0
        if self.rect.right >= self.maxXConstraint:
            self.rect.right = self.maxXConstraint


    def shootLaser(self):
        self.lasers.add(Laser(self.rect.center, -8, self.rect.bottom))     

    def update(self):
        self.getInput()
        self.constraint()
        self.recharge()
        self.lasers.update()