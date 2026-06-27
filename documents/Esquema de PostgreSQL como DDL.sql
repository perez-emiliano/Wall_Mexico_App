CREATE TABLE "applications"(
    "id" INTEGER NOT NULL,
    "candidate_id" INTEGER NOT NULL,
    "job_id" INTEGER NOT NULL,
    "status" VARCHAR(255) CHECK
        (
            "status" IN(
                'pending',
                'reviewing',
                'accepted',
                'rejected'
            )
        ) NOT NULL,
        "applied_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE
    "applications" ADD PRIMARY KEY("id");
COMMENT
ON COLUMN
    "applications"."candidate_id" IS 'Quien aplica';
COMMENT
ON COLUMN
    "applications"."job_id" IS 'A que puesto aplica';
COMMENT
ON COLUMN
    "applications"."status" IS 'Estado del proceso (Sprint 4.2)';
COMMENT
ON COLUMN
    "applications"."applied_at" IS 'Cuando se postuló';
CREATE TABLE "jobs"(
    "id" INTEGER NOT NULL,
    "company_id" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "salary" DECIMAL(10, 2) NULL,
    "modality" VARCHAR(255) CHECK
        (
            "modality" IN('onsite', 'remote', 'hybrid')
        ) NOT NULL,
        "vacancies_count" INTEGER NOT NULL DEFAULT 1,
        "status" VARCHAR(255)
    CHECK
        ("status" IN('active', 'closed')) NOT NULL,
        "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE
    "jobs" ADD PRIMARY KEY("id");
COMMENT
ON COLUMN
    "jobs"."id" IS 'Identificador unico';
COMMENT
ON COLUMN
    "jobs"."company_id" IS 'Que empresa publico la vacante';
COMMENT
ON COLUMN
    "jobs"."title" IS 'Nombr del puesto (Ej: Desarrollador Frontend)';
COMMENT
ON COLUMN
    "jobs"."description" IS 'Requisitos y responsabilidades';
COMMENT
ON COLUMN
    "jobs"."salary" IS 'Sueldo ofrecido (ocultable si es nulo)';
COMMENT
ON COLUMN
    "jobs"."modality" IS 'Tipo de jornada';
COMMENT
ON COLUMN
    "jobs"."status" IS 'Estado de la vacante (Sprint 2.2';
CREATE TABLE "companies"(
    "id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "company_name" VARCHAR(255) NOT NULL,
    "logo_url" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "sector" VARCHAR(255) NOT NULL,
    "latitude" DECIMAL(10, 8) NOT NULL,
    "longitude" DECIMAL(11, 8) NOT NULL
);
COMMENT
ON TABLE
    "companies" IS 'Datos de las empresas que publican vacantes. Incluye la localización para el mapa.';
ALTER TABLE
    "companies" ADD PRIMARY KEY("id");
ALTER TABLE
    "companies" ADD CONSTRAINT "companies_user_id_unique" UNIQUE("user_id");
COMMENT
ON COLUMN
    "companies"."id" IS 'Identificador único';
COMMENT
ON COLUMN
    "companies"."user_id" IS 'Conexión uno-a-uno con su cuenta de empresa';
COMMENT
ON COLUMN
    "companies"."company_name" IS 'Razón social o nombre comercial';
COMMENT
ON COLUMN
    "companies"."logo_url" IS 'Enlace al logo de la empresa';
COMMENT
ON COLUMN
    "companies"."description" IS 'A qué se dedica la empresa';
COMMENT
ON COLUMN
    "companies"."sector" IS 'Categoría (Ej: Tecnología, Hostelería, Salud)';
COMMENT
ON COLUMN
    "companies"."latitude" IS 'Coordenada X para el mapa';
COMMENT
ON COLUMN
    "companies"."longitude" IS 'Coordenada Y para el mapa';
CREATE TABLE "candidates"(
    "id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "full_name" VARCHAR(255) NOT NULL,
    "bio" TEXT NOT NULL,
    "skills" TEXT NOT NULL,
    "cv_url" VARCHAR(255) NOT NULL
);
COMMENT
ON TABLE
    "candidates" IS 'Contiene la información profesional de quienes buscan empleo.';
ALTER TABLE
    "candidates" ADD PRIMARY KEY("id");
ALTER TABLE
    "candidates" ADD CONSTRAINT "candidates_user_id_unique" UNIQUE("user_id");
COMMENT
ON COLUMN
    "candidates"."id" IS 'Identificador único.';
COMMENT
ON COLUMN
    "candidates"."user_id" IS 'Conexión uno-a-uno con su cuenta';
COMMENT
ON COLUMN
    "candidates"."full_name" IS 'Nombre completo';
COMMENT
ON COLUMN
    "candidates"."bio" IS 'Extracto profesional o biografía';
COMMENT
ON COLUMN
    "candidates"."skills" IS 'Lista de habilidades';
COMMENT
ON COLUMN
    "candidates"."cv_url" IS 'Enlace al archivo PDF del CV (Cloudinary/S3)';
CREATE TABLE "users"(
    "id" INTEGER NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "role" VARCHAR(255) CHECK
        ("role" IN('candidate', 'company')) NOT NULL,
        "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
COMMENT
ON TABLE
    "users" IS 'Centraliza la seguridad de la app. Un usuario puede ser candidato o empresa.';
ALTER TABLE
    "users" ADD PRIMARY KEY("id");
ALTER TABLE
    "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");
COMMENT
ON COLUMN
    "users"."id" IS 'Identificador unico';
COMMENT
ON COLUMN
    "users"."email" IS 'Correo electronico para el login';
COMMENT
ON COLUMN
    "users"."password_hash" IS 'Contraseña encriptada (bcrypt)';
COMMENT
ON COLUMN
    "users"."role" IS 'Define que tipo de usuario es';
COMMENT
ON COLUMN
    "users"."created_at" IS 'Fecha de registro';
ALTER TABLE
    "candidates" ADD CONSTRAINT "candidates_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "jobs" ADD CONSTRAINT "jobs_company_id_foreign" FOREIGN KEY("company_id") REFERENCES "companies"("id");
ALTER TABLE
    "applications" ADD CONSTRAINT "applications_job_id_foreign" FOREIGN KEY("job_id") REFERENCES "jobs"("id");
ALTER TABLE
    "applications" ADD CONSTRAINT "applications_candidate_id_foreign" FOREIGN KEY("candidate_id") REFERENCES "candidates"("id");
ALTER TABLE
    "companies" ADD CONSTRAINT "companies_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");