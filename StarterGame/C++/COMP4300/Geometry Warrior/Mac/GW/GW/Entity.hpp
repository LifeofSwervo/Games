//  Entity.hpp
#include "Common.h"
#include <memory>
#ifndef Entity_hpp
#define Entity_hpp
#include <stdio.h>

class Entity
{
    //friend class EntityManager;
    
    bool m_active;
    size_t m_id;
    std::string m_tag;
    
    // Constructor
    Entity(const size_t id, const std::string& m_tag);
    
public:
    
    // Private Member access functions
    bool isActive() const;
    const size_t id() const;
    const std::string & tag() const;
    void destroy();
};

#endif /* Entity_hpp */
