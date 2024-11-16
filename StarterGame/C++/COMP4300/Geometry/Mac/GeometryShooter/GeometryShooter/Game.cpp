//  Game.cpp
#include "Game.hpp"

// Import Game Config
Game::Game(const std::string & config)
{
    init(config);
}

void Game::init(const std::string & path)
{
    std::ifstream fin(path);
    
    fin >> m_playerConfig.SR >> m_playerConfig.CR >> m_playerConfig.S;
    
    // Set up default window parameter
    InitWindow(1280, 720, "ECS Game");
    SetTargetFPS(60);
    
    spawnPlayer();
    
}

void Game::run()
{
    while (m_running)
    {
        m_entities.update();
        
        if (!m_paused)
        {
            
        }
        
        sEnemySpawner();
        sMovement();
        sCollision();
        sUserInput();
        sRender();
        
        // Increment the frame
        
        m_currentFrame++;
    }
}

void Game::setPaused(bool paused)
{
    // Todo
}

void Game::spawnPlayer()
{
    // Process to create a new entity
    auto entity = m_entities.addEntity("player");
    
    // Give this ability a transform so it spawns at (200,200) with velocity (1,1) and angle 0
    entity->cTransform = std::make_shared<CTransform>(Vec2(200.0f, 200.0f), Vec2(1.0f, 1.0f), 0.0f);
    
    // Entity will have radius of 32, 8 sides, dark grey fill, and red outline of 4 thickness.
    //entity->cShape = std::make_shared<CShape>(32.0f, 8, Color GRAY, Color RED, 4);
    
    
    entity->cInput = std::make_shared<CInput>();
    
    // Set Game's player variable to be this entity.
    m_player = entity;
}

// Spawn an enemy at a random location
void Game::spawnEnemy()
{
    // Ensure enemy is spawned with the m_enemyConfig variables
    
    // Log when the last enemy was spawned
    m_lastEnemySpawnTime = m_currentFrame;
}


void Game::spawnSmallEnemies(std::shared_ptr<Entity> e)
{
    // Todo: Spawns small enemies at the location of the input enemy e
    
    // - Spawn a small number of enemies equal to the vertices of the enemy
    // - Set each small enemy to the same color as the original, half the size
    // - Small enemies are worth double points of the original way
}

// Spawns a bullet from a given entity to a target location
void Game::spawnBullet(std::shared_ptr<Entity> entity, const Vec2 & target)
{
    
}

/*
Game::Game() : m_running(true)
{
    InitWindow(SCREEN_WIDTH, SCREEN_HEIGHT, "Game");
    SetTargetFPS(60);
}


void Game::Run(void)
{
    while (!WindowShouldClose())
    {
        Update();
        Render();
    }
    CloseWindow();
}

void Game::Update()
{
    if (m_entityManager) {
    m_entityManager->Update(); // Ensure m_entityManager is valid
    }
}

void Game::Render()
{
    BeginDrawing();
    ClearBackground(RAYWHITE);
    
    if (m_entityManager)
    {
        m_entityManager->Render();
    }
    
    EndDrawing();
}
*/
