import pygame

#Setup
pygame.init()
screenWidth = 800
screenHeight = 400
screen = pygame.display.set_mode((screenWidth,screenHeight))
pygame.display.set_caption('Pong +')
clock = pygame.time.Clock()

#Game Rectangles
ball = pygame.Rect(screenWidth/2 - 15,screenHeight/2 - 15,30,30)
player = pygame.Rect(screenWidth - 20, screenHeight/2 - 70,10,140)
opponent = pygame.Rect(10, screenHeight/2 - 70, 10, 140)

#Color
bgColor = pygame.Color('grey12')
lightGrey = (200,200,200)

#Game Loop
while True:
    #Input Handling
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            exit()
    
    #Visuals
    screen.fill(bgColor)
    pygame.draw.rect(screen,lightGrey,player)
    pygame.draw.rect(screen,lightGrey,opponent)
    pygame.draw.ellipse(screen,lightGrey,ball)
    pygame.draw.aaline(screen, lightGrey, (screenWidth/2,0),(screenWidth/2,screenHeight))




    pygame.display.update()
    clock.tick(60)