// Game.hpp
#include "Common.h"
#include "Entity.hpp"
#include "EntityManager.hpp"
 

struct PlayerConfig { int SR, CR, FR, FG, FB, OR, OG, OB, OT, V; float S; };
struct EnemyConfig  { int SR, CR, OR, OG, OB, OT, VMIN, VMAX, L, SI; float SMIN, SMAX; };
struct BulletConfig { int SR, CR, FR, FG, FB, OR, OG, OB, OT, V, L; float S; };

class Game
{
    // May need to init window
    // font
    // Text
    EntityManager m_entities;
    PlayerConfig m_playerConfig;
    EnemyConfig m_enemyConfig;
    BulletConfig m_bulletConfig;
    int m_currentFrame = 0;
    int m_lastEnemySpawnTime = 0;
    int m_score = 0;
    bool m_paused = false; //Tracking if we stopped updating game logic
    bool m_running = true; //Tracking if the game is running

    
    std::shared_ptr<Entity> m_player;
    
    void init(const std::string & config); // Inits game-state with a config filepath
    void setPaused(bool paused); // Pause game
    
    // System Functions
    void sMovement();          // System: Entity Position / Movement update
    void sUserInput();         // System: User Input
    void sLifespan();          // System: Lifespan
    void sRender();            // System: Render / Drawing
    void sEnemySpawner();      // System: Spawns Enemy
    void sCollision();         // System: Collisions
    
    void spawnPlayer();
    void spawnEnemy();
    void spawnBullet(std::shared_ptr<Entity> entity, const Vec2 & mousePos);
    void spawnSpecialWeapon(std::shared_ptr<Entity entity>);
    
    
public:
    Game(const std::string & config); // Constructor, taking in-game config
    
    void run();
};
