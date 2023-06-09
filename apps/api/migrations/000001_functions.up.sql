CREATE OR REPLACE FUNCTION updatedAt()   
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;   
END;
$$ language 'plpgsql';
