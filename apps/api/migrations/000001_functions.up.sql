CREATE OR REPLACE FUNCTION updatedAt()   
RETURNS TRIGGER AS $$
BEGIN
    NEW.updatedAt = now();
    RETURN NEW;   
END;
$$ language 'plpgsql';
