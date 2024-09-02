import pygame as pg
from settings import *
from player import Player
from enemy import Enemy
from ball import Ball
from centerLine import CenterLine
import random
import math

class Level:
    def __init__(self, surface):
        # level setup
        self.displaySurface = surface
        self.setupLevel() 
        self.enemyScore = 0
        self.playerScore = 0
        self.font = pg.font.Font('font/Pixeltype.ttf', 50)

        # Sprites
        playerSprite = Player(height)
        self.player.add(playerSprite)
        


        enemySprite = Enemy()
        self.enemy.add(enemySprite)

        lineSprite = CenterLine()
        self.line.add(lineSprite)

        #Ball Start
            # Ball Trajectory set to random
        self.ballSpeed_x = 7 * random.choice((1, -1)) 
        self.ballSpeed_y = 7 * random.choice((1, -1))

            # Ball Sprite
        self.ballSprite = Ball()
        self.ball.add(self.ballSprite)

    def ballRestart(self):
        # Ball Restart
        self.ballSprite.rect.center = (width / 2, height / 2) # Place ball in center of screen
        pg.time.delay(500) # Delay before ball starts moving again for 5 seconds
        # Randomize ball trajectory
        self.ballSpeed_x *= random.choice((1, -1))
        self.ballSpeed_y *= random.choice((1, -1))

    def ballMovement(self):
        # Ball Movement
        self.ballSprite.rect.x += self.ballSpeed_x
        self.ballSprite.rect.y += self.ballSpeed_y

        # Screen Constraint
        if self.ballSprite.rect.top <= 0 or self.ballSprite.rect.bottom >= height: # Top of Screen Constraint & Bottom of Screen Constraint
            self.ballSpeed_y *= -1
        if self.ballSprite.rect.left <= 0: # Enemy Score (Ball on left of screen)
            self.ballRestart()
            self.enemyScore += 1
        if self.ballSprite.rect.right >= width: # Player Score (Ball on right screen)
            self.ballRestart()
            self.playerScore += 1

        # Player Scoreboard
        self.scoreString = "Score: " + str(self.playerScore) 
        self.score = self.font.render(self.scoreString, False, (200, 200, 200))
        self.scoreRect = self.score.get_rect(center = (width / 8, height / 8))
        self.displaySurface.blit(self.score, self.scoreRect)

        # Enemy Scoreboard
        self.enemyScoreString = "Score: " + str(self.enemyScore)
        self.eScore = self.font.render(self.enemyScoreString, False, (200, 200, 200))
        self.eScoreRect = self.eScore.get_rect(center = (width / 1.2, height / 8))
        self.displaySurface.blit(self.eScore, self.eScoreRect)



        self.ballCollision()
        '''
        # Ball Collisions
            # Player
        if self.ballSprite.rect.colliderect(self.player.sprite.rect) and self.ballSpeed_x < 0:
            if abs(self.ballSprite.rect.left - self.player.sprite.rect.right) < 10:# If the left of the ball sprite collides with the right of the player rect.
                self.ballSpeed_x *= -1
            elif abs(self.ballSprite.rect.bottom - self.player.sprite.rect.top) < 10 and self.ballSpeed_y > 0:# If the bottom of the ball sprite collides with the top of the player rect. 
                self.ballSpeed_y *= -1
            elif abs(self.ballSprite.rect.top - self.player.sprite.rect.bottom) < 10 and self.ballSpeed_y < 0:# If the top of the ball sprite collides with the bottom of the player rect. 
                self.ballSpeed_y *= -1                                                                        # -----> Side note - This avoides issues, allowing the ball not to bounce when it is moving away from the player side.
        for enemySprites in self.enemy.sprites():
            if self.ballSprite.rect.colliderect(enemySprites.rect):                                           
                self.ballSpeed_x *= -1
        '''

    # NEW BALL COLLISION CODE
    def ballCollision(self):
        PADDLEOFFSET = 4
        MAXBOUNCEANGLE = math.pi / 4  # Similar to JS `Math.PI / 12`, adjust this value as needed

        # Player Paddle Collision
        if self.ballSprite.rect.colliderect(self.player.sprite.rect) and self.ballSpeed_x < 0:
            # Calculate relative intersection with player paddle
            paddle_center_y = self.player.sprite.rect.centery
            relative_intersect_y = paddle_center_y - self.ballSprite.rect.centery
            normalized_intersect_y = relative_intersect_y / (self.player.sprite.rect.height / 2)
            
            # Calculate bounce angle
            bounce_angle = normalized_intersect_y * MAXBOUNCEANGLE

            # Calculate new velocities based on bounce angle
            ball_speed = math.sqrt(self.ballSpeed_x**2 + self.ballSpeed_y**2)
            self.ballSpeed_x = ball_speed * -math.cos(bounce_angle)
            self.ballSpeed_y = ball_speed * math.sin(bounce_angle)

            # Ensure ball moves away from the paddle
            self.ballSpeed_x *= -1

        # Enemy Paddle Collision
        for enemySprites in self.enemy.sprites():
            if self.ballSprite.rect.colliderect(enemySprites.rect) and self.ballSpeed_x > 0:
                paddle_center_y = enemySprites.rect.centery
                relative_intersect_y = paddle_center_y - self.ballSprite.rect.centery
                normalized_intersect_y = relative_intersect_y / (enemySprites.rect.height / 2)

                # Calculate bounce angle for enemy paddle
                bounce_angle = normalized_intersect_y * MAXBOUNCEANGLE
                ball_speed = math.sqrt(self.ballSpeed_x**2 + self.ballSpeed_y**2)
                self.ballSpeed_x = ball_speed * -math.cos(bounce_angle)
                self.ballSpeed_y = ball_speed * math.sin(bounce_angle)
        # Ball Restart
    
        

    def enemyAI(self):
        enemySpeed = 5 # Speed of Enemy 

        for enemySprites in self.enemy.sprites():
            # Setting enemy to follow ball if ball is below enemy.
            if enemySprites.rect.top < self.ballSprite.rect.y:
                enemySprites.rect.top += enemySpeed
            # Setting enemy to follow ball if ball is above enemy.      
            if enemySprites.rect.bottom > self.ballSprite.rect.y:
                enemySprites.rect.bottom -= enemySpeed
            # Stop enemy from passing top of screen border. 
            if enemySprites.rect.top <= 0:
                enemySprites.rect.top = 0
            # Stop enemy from passing bottom of screen border. 
            if enemySprites.rect.bottom >= height:
                enemySprites.rect.bottom = height

    def setupLevel(self):
        self.player = pg.sprite.GroupSingle()
        self.enemy = pg.sprite.Group()
        self.ball = pg.sprite.Group()
        self.line = pg.sprite.Group()



    def run(self):
        self.player.update()
        self.player.draw(self.displaySurface)

        self.enemy.draw(self.displaySurface)
        self.enemyAI()
        
        #self.ball.update()
        self.ball.draw(self.displaySurface)
        self.ballMovement()

        pg.draw.aaline(self.displaySurface, (200, 200, 200), (width / 2, 0), (width / 2, height))