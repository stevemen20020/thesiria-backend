```
📦 prisma/      # Used to store the prisma model schema file
    ├──schema.prisma
📦 public/      # Used to store static files
📦 scripts/     # Scripts to automate the generation of files in the app
📦 src/         # Code base
    ├── 📂 config/              # Config files
    ├── 📂 data/                # Stores data fetching adapters.
    ├── 📂 domain/              # Datasources, DTO's, Entities, Types and Enums, Errors, Helpers, Mappers and Repositories.
        ├── 📂 datasources/     # Datasource interface for specific models.
            ├── 📂 [model]/
                ├── [model].datasource.ts       
        ├── 📂 dto/             # Data transfer objects for different models.
            ├── 📂 [model]/
                ├── [dtoType][model].dto.ts
                ├── validator.ts 
        ├── 📂 entities/        # Interfaces for each model
            ├── 📂 [model]/
                ├── [model].entity.ts
        ├── 📂 enums/           # Enums used in the app
        ├── 📂 errors/          # Custom error handling
            ├── AppCustom.error.ts
            ├── Message.error.ts
        ├── 📂 helpers/         # Helper functions
        ├── 📂 mappers/         # Mapper functions to translate Prisma to entity and viceversa
            ├── 📂 [model]/
                ├── [model].mapper.ts
        ├── 📂 repositories/    # Repository interfaces for specific models.
            ├── 📂 [model]/
                ├── [model].repository.ts     
    ├── 📂 infrastructure/       # Data recovery logic
        ├── 📂 datasources/      # Prisma data fetching and posting logic
            ├── 📂 [model]/
                ├── [model].datasource.impl.ts
        ├── 📂 repositories/    # Data fetching and positng function calls
            ├── 📂 [model]/
                ├── [model].repository.impl.ts
    ├── 📂 presentation/        # Routing and controller logic handling
        ├── 📂 [model]/         # Model specific routing and controlling
            ├── controller.ts
            ├── routes.ts
        ├── routes.ts
        ├── server.ts
    ├── app.ts        # Entry point of the app
```