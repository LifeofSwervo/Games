// EntityManager.cpp
#include "EntityManager.hpp"

EntityManager::EntityManager()
{
    
}

void EntityManager::update()
{
    // Adds entities from m_entitiesToAdd to the proper locations
    //  - Adds them to the vector of all entites
    //  - Adds them to the vector inside the map, with the tag as the key
    
    removeDeadEntities(m_entities);
    
    for (auto& [tag, entityVec] : m_entityMap)
    {
        removeDeadEntities(entityVec);
    }
}

void EntityManager::removeDeadEntities(EntityVec & vec)
{
    // Removes all dead entities from the input vector
    // This function is called by the update function
}

std::shared_ptr<Entity> EntityManager::addEntity(const std::string & tag)
{
    // Adds enemies to the m_entitiesToAdd, then placed in the proper location in the update() function.
    
    // Create entity and shared pointer
    auto entity = std::shared_ptr<Entity>(new Entity(m_totalEntities++, tag));
    
    // This line may need to be changed
    m_entitiesToAdd.push_back(entity);
    
    return entity;
}

const EntityVec & EntityManager::getEntities()
{
    return m_entities;
}

const EntityVec & EntityManager::getEntities(const std::string & tag)
{
    // This is incorrect, correct it and return the correct vector from the map
    return m_entities;
}
